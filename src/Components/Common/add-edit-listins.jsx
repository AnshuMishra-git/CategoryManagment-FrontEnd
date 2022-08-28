// eslint-disable-next-line
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import CIcon from '@coreui/icons-react';
import { InputText } from 'primereact/inputtext';
import {
    cilCheck, cilXCircle
} from '@coreui/icons';
import { CFormCheck } from '@coreui/react'
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { CImage } from '@coreui/react'
import {
    cilCloudUpload
} from '@coreui/icons'
import fetchApi from '../../Common/fetchApi';
import url from '../../Common/Url';

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Dropdown } from 'primereact/dropdown';

const AddeditListing = () => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const name = new URLSearchParams(search).get('name');

    console.log('name-->>>', name);

    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);


    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [masterForm, setMasterForm] = useState({
        name: '',
        category: '',
        subCategory: '',
    })

    const oncancleForm = (e) => {
        e.preventDefault()
        navigate('/');
    }

    useEffect(() => {
        if (name == 'SubCategory' || name == 'ChildSubCategory') {
            getCategoryData();
        }
        if (id) {
            getData();
        }
    }, []);

    useEffect(() => {
        if (masterForm.category) {
            getSubCategoryData();
        }
    }, [masterForm.category])

    const getUpdateUrl = async () => {
        if (name == 'Category') return url.CATEGORY_UPDATE
        if (name == 'SubCategory') return url.SUB_CATEGORY_UPDATE
        if (name == 'ChildSubCategory') return url.CHILD_SUB_CATEGORY_UPDATE
    }

    const getCreateUrl = async () => {
        if (name == 'Category') return url.CATEGORY_CREATE
        if (name == 'SubCategory') return url.SUB_CATEGORY_CREATE
        if (name == 'ChildSubCategory') return url.CHILD_SUB_CATEGORY_CREATE
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let apiUrl;
        let obj = {
            'name': masterForm.name
        }
        if (id) obj['_id'] = id;
        if (name == 'SubCategory' || name == 'ChildSubCategory') obj['categoryId'] = masterForm.category;
        if (name == 'ChildSubCategory') obj['subCategoryId'] = masterForm.subCategory;

        if (id) {
            apiUrl = await getUpdateUrl()
        } else {
            apiUrl = await getCreateUrl()
        }
        const response = await fetchApi({
            method: id ? 'put' : 'post',
            reqUrl: apiUrl,
            data: obj,
        });
        console.log('Response ===>>>', response);
        if (response.data.code == 200) {
            // navigate('/');
            if (name == "Category") navigate('/');
            if (name == "SubCategory") navigate('/subCategory');
            if (name == "ChildSubCategory") navigate('/childSubCategory');
        }
    }

    const onHandleChange = (event, radioVal, isAddress) => {
        // event.preventDefault()
        if (event?.target?.type === "checkbox") {
            setMasterForm({ ...masterForm, [event.target.name]: event.target.checked })
        } else if (event?.target?.type === "radio") {
            setMasterForm({ ...masterForm, [event.target.name]: radioVal ? 1 : 0 })
        }
        else {
            setMasterForm({ ...masterForm, [event.target.name]: event.target.value })
        }
    }

    // const onDropdownChangeAddress = (e, key) => {
    //     setMasterForm({ ...masterForm, [key]: e.target.value })
    //     let errors = error
    //     errors[key] = ''
    //     setErrors({ ...errors });
    //     if (key === 'country') {
    //         setCountryId(e.target.value);
    //         getStateList(e.target.value);
    //     }

    // }


    const getDataUrl = async () => {
        if (name == 'Category') return `${url.CATEGORY}?_id=${id}`
        if (name == 'SubCategory') return `${url.SUB_CATEGORY}?_id=${id}`
        if (name == 'ChildSubCategory') return `${url.CHILD_SUB_CATEGORY}?_id=${id}`
    }


    const getData = async () => {
        const updatedUrl = await getDataUrl();
        const response = await fetchApi({ method: 'get', param: updatedUrl });
        if (response.data.code == 200) {
            let obj = {
                name: response.data.data[0].name
            }
            if (name == 'SubCategory' || name == 'ChildSubCategory') obj['category'] = response.data.data[0].categoryId;
            if (name == 'ChildSubCategory') obj['subCategory'] = response.data.data[0].subCategoryId;
            setMasterForm(obj)
        }
    }

    const getCategoryData = async () => {
        setLoading(true)
        const updatedUrl = url.CATEGORY;
        const response = await fetchApi({ method: 'get', param: updatedUrl });
        setLoading(false);
        setCategoryData(response.data.data);
    }
    const getSubCategoryData = async () => {
        setLoading(true)
        const updatedUrl = `${url.SUB_CATEGORY}?_id=${masterForm.category}&name=categoryId`;
        const response = await fetchApi({ method: 'get', param: updatedUrl });
        setLoading(false);
        console.log('Length', response.data.data.length);
        if (response.data.data.length) {
            setSubCategoryData(response.data.data)
        } else setSubCategoryData([response.data.data]);
    }

    return (
        <div>
            {isLoading && <CircularProgress disableShrink />}
            <form name="subMasterFrm" noValidate>
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{'Country'} </h5>
                    </div>
                    <div className="card-body">
                        <p className="col-sm-12 text-right">Fields marked with <span className="text-danger">*</span> are mandatory.</p>
                        <div className="row">
                            {
                                (name == 'SubCategory' || name == 'ChildSubCategory') && (
                                    <div className="col-md-6 col-lg-4 mb-3">
                                        <span className="p-float-label custom-p-float-label">
                                            <Dropdown value={masterForm.category} className="form-control" name='category' options={categoryData} onChange={(e) => onHandleChange(e)} optionLabel="name" optionValue="_id" filter filterBy="name" />
                                            <label>Category <span className="text-danger">*</span></label>
                                        </span>
                                    </div>
                                )
                            }
                            {
                                name == 'ChildSubCategory' && (
                                    <div className="col-md-6 col-lg-4 mb-3">
                                        <span className="p-float-label custom-p-float-label">
                                            <Dropdown value={masterForm.subCategory} className="form-control" name='subCategory' options={subCategoryData} onChange={(e) => onHandleChange(e)} optionLabel="name" optionValue="_id" filter filterBy="name" />
                                            <label>Sub Category <span className="text-danger">*</span></label>
                                        </span>
                                    </div>
                                )
                            }
                            <div className="col-md-6 mb-3">
                                <span className="p-float-label custom-p-float-label">
                                    <InputText className="form-control" name="name" value={masterForm.name} onChange={(e) => onHandleChange(e)} required />
                                    <label>{`${name} Name`} <span className="text-danger">*</span></label>

                                </span>
                            </div>

                        </div>

                        {/* <Dropdown value={selectedCountry} options={countries} onChange={(e) => setSelectedCountry(e.value)} optionLabel="name" filter showClear filterBy="name"
    placeholder="Select a Country" itemTemplate={countryOptionTemplate} />
  */}
                        <div className="card-footer">
                            <button className="btn btn-primary mb-2 mr-2" onClick={(e) => { onSubmit(e) }}><CIcon icon={cilCheck} />{0 ? 'Update' : 'Save'}</button>
                            <button className="btn btn-danger mb-2" onClick={(e) => oncancleForm(e)}><CIcon icon={cilXCircle} className="mr-1" />Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddeditListing


