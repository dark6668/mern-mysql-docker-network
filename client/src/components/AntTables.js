import React from 'react';
import { Table} from 'antd';
export default function AntTables({columns,rows,perSize,rowClickedFunction}) {


const totalItems = rows !== undefined ? rows.length : 0; 
return(
<Table
    columns={columns}
    dataSource={rows}
    pagination={{
        pageSize: perSize,
        total: totalItems,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    }}
    onRow={(record) => {
        return {
            onClick: () => rowClickedFunction(record)
            
        };
    }}
    rowClassName="clickable-row"
    showSorterTooltip={{ target: 'sorter-icon' }}
/>

);
}
