import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import fetchApi from '../../Common/fetchApi';

function ListingData(props) {
    const [data, setData] = useState(props?.data);
    const navigate = useNavigate();

    useEffect(() => {
        setData(props?.data);
    }, [props?.data])


    const header = (
        <div className="clearfix">
            <Button label={`Add ${props?.shortName}`} type="button" aria-label="Submit" style={{ "float": "right" }} onClick={() => navigate(`/add-edit?name=${props?.name}`)} />

        </div>
    );

    const footer = `In total there are ${data ? data.length : 0} data.`;

    const snoBodyTemplate = (rowData, rowIndex) => {
        return rowIndex.rowIndex + 1;
    }

    const deleteData = async (data) => {
        const response = await fetchApi({
            method: 'delete',
            reqUrl: `${props?.deleteUrl}${data}`,
        });
        if (response.data.code == 200) {
            props.refreshData()
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Action</span>
                <Button label={`Edit ${props?.shortName}`} type="button" aria-label="Submit" style={{ "float": "right" }} onClick={() => navigate(`/add-edit?id=${rowData?._id}&name=${props?.name}`)} />
                <Button label={`Delete ${props?.shortName}`} type="button" aria-label="Submit" style={{ "float": "right" }} onClick={() => deleteData(rowData?._id)} />
            </React.Fragment>
        );
    }



    const nameBodyTemplate = (rowData) => {
        return rowData.name;
    }

    const categoryBodyTemplate = (rowData) => {
        return rowData.categoryName;
    }
    const subCategoryBodyTemplate = (rowData) => {
        return rowData.subCategoryName;
    }

    return (
        <>
            <div className="datatable-templating-demo">

                <div className="card">
                    <DataTable value={data} header={header} footer={footer} responsiveLayout="scroll">
                        <Column header="SNO" body={snoBodyTemplate} ></Column>
                        {/* <Column field="name" header="Name"></Column> */}
                        {
                            (props?.name == 'SubCategory' || props?.name == 'ChildSubCategory') && (
                                <Column field="categoryName" header="Category" body={categoryBodyTemplate}></Column>
                            )
                        }
                        {
                            props?.name == 'ChildSubCategory' && (
                                <Column field="subCategoryName" header="Sub Category" body={subCategoryBodyTemplate}></Column>
                            )
                        }
                        <Column field="name" header={`${props?.shortName}`} body={nameBodyTemplate}></Column>
                        <Column field="action" header="Action" body={actionBodyTemplate} style={{ width: '10%' }}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
}

export default ListingData
