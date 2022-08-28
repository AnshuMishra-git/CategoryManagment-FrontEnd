import React, { useEffect, useState, useRef } from 'react'
import fetchApi from '../Common/fetchApi';
import url from '../Common/Url';
import CircularProgress from '@mui/material/CircularProgress';
import ListingData from './Common/listing';
import { useLocation } from 'react-router-dom'
import { Messages } from 'primereact/messages';

function Category() {
    const location = useLocation();
    const msgs3 = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
        msgs3.current.show({
            severity: 'info', sticky: true, content: (
                <React.Fragment>
                    <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" />
                    <div className="ml-2">Category Managment</div>
                </React.Fragment>
            )
        });
    }, []);

    const refreshData = () => {
        getData();
    }

    const getData = async () => {
        setLoading(true)
        const updatedUrl = url.CATEGORY;
        const resonse = await fetchApi({ method: 'get', param: updatedUrl });
        setLoading(false);
        setData(resonse.data.data);
        // const response = await fetchApi({
        //     method: 'post',
        //     reqUrl: url.CATEGORY,
        //     data: body,
        // });
    }
    return (
        <div>
            {isLoading && <CircularProgress disableShrink />}

            <Messages ref={msgs3} />
            {data &&
                <ListingData data={data} path={location.pathname} refreshData={refreshData}
                    name={'Category'} shortName={'Category'} deleteUrl={url.CATEGORY_DELETE} />
            }
        </div>
    )
}

export default Category
