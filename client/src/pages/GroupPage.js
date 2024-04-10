import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Utility from "../function/utility";
import Header from "../components/Header";

export default function GroupPage() {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        authorization();
      }, []);
      useEffect(() => {

        // authorization();
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
              navigate("/");
            });
        } catch (error) {
              navigate("/");
        }
      }
      
    return(
        <div>
                 {Object.keys(user).length > 0 && (
        <div className="user-select-none">
          <Header user={user} />
        </div>
      )}
        </div>
    )
}