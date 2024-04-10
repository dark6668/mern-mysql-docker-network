import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Utility from "../function/utility";
import { useNavigate } from "react-router-dom";
import AntTables from "../components/AntTables";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Popconfirm } from 'antd';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    authorization();
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getGroups();
    }
  }, [user]);

  async function authorization() {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
      return;
    }
    try {
      let request = {
        method: "POST",
        url: "api/auth/validate-token",
        ContentType: "application/json; charset=UTF-8",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      };
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      Utility.FetchRequest(request)
        .then((data) => {
          setUser(data.user[0]);
        })
        .catch(() => {
          Utility.UserUnauthorized()
          navigate("/");
        });
    } catch (error) {
      Utility.UserUnauthorized()
          navigate("/");
    }
  }

  async function getGroups() {
    const request = {
      method: "GET",
      url: `api/groups/getGroups/${user.id}`,
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };
    Utility.FetchRequest(request)
      .then((data) => {
        setGroups(
          data.map((group,index) => ({
            key:group.id,
            groupName: group.groupName,
            numberOfUsers: group.count_of_users,
          })),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      showSorterTooltip: {
        target: 'full-header',
      },
      filters: groups.map(group => ({ text: group.groupName, value: group.groupName })),
      onFilter: (value, record) => record.groupName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Users',
      dataIndex: 'numberOfUsers',
      showSorterTooltip: {
        target: 'full-header',
      },
      sorter: (a, b) => a.numberOfUsers - b.numberOfUsers,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: () => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete this group?"
            onConfirm={(e) => {
              e.stopPropagation()
              console.log("delete")}}
            okText="yes"
            okType="danger"
            cancelText="No"
            onCancel={(e) =>e.stopPropagation()}
          >
            <Button type="link" danger icon={<DeleteOutlined />}  onClick={(e) => e.stopPropagation()}  />
          </Popconfirm>
        </Space>
      ),
    }
  ];

  function rowClicked(row) {
    navigate(`/group/${row.key}`);
  }

  return (
    <div>
      {Object.keys(user).length > 0 && (
        <div className="user-select-none">
          <Header user={user} />
         <AntTables rowClickedFunction={rowClicked} columns={columns} rows={groups} perSize={3}  />
        </div>
      )}
    </div>
  );
}
