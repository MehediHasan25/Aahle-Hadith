import React,{useEffect, useState} from 'react'
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SaveDonationAmt,GetDonationAmtList,DeleteDonationAmt } from '../../../URL/ApiList';
import withAuthentication from '../../Protected/withAuthentication';

const DonationAmount = () => {
    const [donationAmount, setDonationAmount] = useState({
        DonationAmtId:"",
        DonationAmt:"",
        DonationAmtBng:"",
        sts:true
    });

    const [listDonationAmount, setListDonationAmount] = useState([]);
    const [search, setSearch] = useState("");
    const [track, setTrack] = useState(false);


    useEffect(()=>{
        getDonationAmt();
    },[]);


    useEffect(() => {
        if(track === true){
            getDonationAmt();
        }
    
        return (() => {
          setTrack(false);
        })
       
      }, [track]);



    const handleDonationAmountChange = (e) => {
        const { name, value } = e.target;
        setDonationAmount((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };



    const getDonationAmt = async()=>{
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try{
            let getDonaAmt = await axios.get(GetDonationAmtList,{headers});
            let getAmtList = getDonaAmt.data._listData;
            // console.log("list", getAmtList);
            setListDonationAmount(getAmtList);

        }catch(err){
            console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
        }

    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        // let banglaNumber = /[০-৯]+(\.[০-৯]*)?$/;
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
        const {DonationAmtId,DonationAmt,DonationAmtBng,sts} = donationAmount;
        

        if(DonationAmt === ""){
            toast.error('Please Enter Donation Amount',{duration: 5000,position: 'top-center'});
            return;
        }

        if(DonationAmtBng === ""){
            toast.error('Please Enter Donation Amount (Bangla)',{duration: 5000,position: 'top-center'});
            return;
        }

        // if(banglaNumber.test(DonationAmtBng) === false){
        //     toast.error('Donation Amount (Bangla) must be in Bangla Number',{duration: 5000,position: 'top-center'});
        //     return;
        // }

        const payload = {
            DonationAmtId:DonationAmtId === "" ? 0 : DonationAmtId,
            DonationAmt:parseInt(DonationAmt),
            DonationAmtBng:DonationAmtBng,
            sts:sts
        }

       // console.log("Donation Amount Payload", payload);

        try{
            let saveAmt = await axios.post(SaveDonationAmt,payload,{headers});
            let AmtSave = saveAmt.data.success;
            
            if(AmtSave === true){
                if(DonationAmtId > 0){
                  toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
                
                }else{
                  toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});  
                
                }

                setTrack(true);
                setDonationAmount({
                ...donationAmount,
                DonationAmtId:"",
                DonationAmt:"",
                DonationAmtBng:""
            });
        }

        }catch(err){
            console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
        }
    }


    const handleEdit =(editData)=>{
       // console.log("edit", editData);
        const {donationAmtId,donationAmt,donationAmtBng,sts} = editData;

        setDonationAmount({
            DonationAmtId:donationAmtId,
            DonationAmt:donationAmt,
            DonationAmtBng:donationAmtBng,
            sts:sts
        });

    }


    const handleDelete = async(id) =>{
        //  console.log("id",id);
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
       
        try{
         let deleteData = await axios.get(DeleteDonationAmt+id, {headers});
         let resDel = deleteData.data.success;
      
         if(resDel === true){
          toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
          setTrack(true);
         }
        }catch(err){
            console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
        }
       }
     







  return (
    <div className="page-content p-4">
            <div className="pg_title">
                <h3>Donation Amount</h3>
            </div>

            <div className="row pt-2">
                <div className="col-md-8">
                    <div className="form card p-3">
                        <form action="" className="form-horizontal">
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Donation Amount
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="number"
                                        placeholder="Enter Donation Amount"
                                        name="DonationAmt"
                                        onChange={handleDonationAmountChange}
                                        value={donationAmount.DonationAmt}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Donation Amount (Bangla)
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Donation Amount (Bangla)"
                                        name="DonationAmtBng"
                                        // pattern='/[০-৯]+(\.[০-৯]*)?$/'
                                        // title='Bangla Numbers Only'
                                        onChange={handleDonationAmountChange}
                                        value={donationAmount.DonationAmtBng}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                            <div className="text-end">
                                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div className="row pt-4">
            <div className="col-md-8">
                    <div className="table form-tbl">
                        <form className="d-flex w-50">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search By Occupation Name"
                                name="search"
                                onChange={handleSearch}
                                value={search}
                                autoComplete='off'
                            />
                        </form>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Action</th>
                                    <th>Donation Amount</th>
                                    <th>Donation Amount (Bangla)</th>

                                </tr>
                            </thead>
                            <tbody>
                                {listDonationAmount.filter((item) => {
                                    return search.toLowerCase() === "" ? item : item.donationAmt.toString().includes(search) || item.donationAmtBng.includes(search.toLowerCase())
                                }).map(item => (
                                    <tr key={item.donationAmtId}>
                                        <td>
                                            <div className="act_icon">

                                                <span onClick={() => window.confirm("Are you sure you want to delete?") && handleDelete(item.donationAmtId)}><BsTrash /></span>
                                                <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                                            </div>
                                        </td>
                                        <td>{item.donationAmt}</td>
                                        <td>{item.donationAmtBng}</td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default withAuthentication(DonationAmount);