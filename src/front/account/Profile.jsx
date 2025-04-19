import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import { UpdateProfile } from "../services/redux/slices/AuthSlice";
import { Modal } from "react-bootstrap";

function Profile() {
    const userProfile = useSelector((state) => state.auth.info)
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [profile, SetProfile] = useState();
    // for reset password
    const [isModalShow, SetIisModalShow] = useState(false);
    const [resetPasswordLoading, SetResetPasswordLoading] = useState(false);

    useEffect(() => {
        getProfile();
    }, [])

    async function getProfile() {
        setLoading(true);
        window.scrollTo(0, 0);
        await AxiosReq(`profile`, '', 'get', navigate, token)
            .then((response) => {
                if (response.success) {
                    SetProfile(response.data);
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    function showProfileLoader() {
        var indents = [];
        indents.push(
            <div className=" text-center mb-4" key={'ploader-0'}>
                <Skeleton height={100} width={100} className="rounded-circle" />
            </div>
        )
        for (var i = 1; i <= 6; i++) {
            indents.push(
                <div className="col-md-6 mb-2" key={'ploader-' + i}>
                    <Skeleton height={20} />
                </div>
            )
        }
        return indents;
    }

    async function changeImg(e) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        setLoading(true);
        await AxiosReq(`update_profile_image`, formData, 'post', navigate, token)
            .then((response) => {
                if (response.success) {
                    toast.success(response.message)
                    SetProfile(prev => ({ ...prev, image: response.data.image }));

                    // update redux profile image
                    const updatedProfile = { ...userProfile, image: response.data.image };
                    dispatch(UpdateProfile(updatedProfile))
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    function profileOnChnage(key, e) {
        SetProfile(prev => ({ ...prev, [key]: e.target.value }))
    }

    async function updateProfile() {
        setLoading(true);
        const formData = new FormData();
        formData.append('first_name', profile.first_name);
        formData.append('last_name', profile.last_name);
        formData.append('contact', profile.mobile);

        await AxiosReq(`update_profile`, formData, 'post', navigate, token)
            .then((response) => {
                if (response.success) {
                    toast.success(response.message)
                    getProfile();
                    const updatedProfileName = { ...userProfile, name: profile.first_name + ' ' + profile.last_name };
                    dispatch(UpdateProfile(updatedProfileName))
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    async function changePassword(){
        const old_password = document.getElementById('old_password').value;
        const new_password = document.getElementById('new_password').value;
        const confirm_password = document.getElementById('confirm_password').value;

        SetResetPasswordLoading(true);
        const formData = new FormData();
        formData.append('old_password', old_password);
        formData.append('new_password', new_password);
        formData.append('confirm_password', confirm_password);

        await AxiosReq(`profile/change-password`, formData, 'post', navigate, token)
            .then((response) => {
                if (response.success) {
                    toast.success(response.message)
                    SetIisModalShow(false)
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                SetResetPasswordLoading(false);
            });
    }

    return (
        <>
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Profile</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    {
                        profile ? <>
                            <div className="col-12 text-center mb-4">
                                <img
                                    src={profile.image}
                                    className="rounded-circle border border-primary border-3 object-fit-cover"
                                    height="100"
                                    width="100"
                                    alt="Profile"
                                />
                                <p
                                    style={{
                                        margin: '-25px -60px 0px 0px',
                                        fontSize: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <label htmlFor="profileimg" className="bi bi-pencil-square bg-white rounded-circle border p-1"></label>
                                </p>
                                <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={(e) => changeImg(e)} className="d-none" id="profileimg" />
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label >First Name</label>
                                <input type="text" className="form-control" name="first_name" id="first_name" value={profile.first_name} onChange={(e) => profileOnChnage('first_name', e)} />
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label >Last Name</label>
                                <input type="text" className="form-control" name="last_name" id="last_name" value={profile.last_name} onChange={(e) => profileOnChnage('last_name', e)} />
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label >Email</label>
                                <input type="text" className="form-control" name="email" id="email" value={profile.email} disabled />
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <label >Mobile</label>
                                <input type="text" className="form-control" name="mobile" id="mobile" value={profile.mobile} onChange={(e) => profileOnChnage('mobile', e)} />
                            </div>

                            <div className="col-12 text-end">
                                <button className="btn btn-primary me-2" onClick={() => updateProfile()}>Update</button>
                                <button className="btn btn-danger" onClick={() => SetIisModalShow(true)} >Reset your password</button>
                            </div>
                        </> : loading ? showProfileLoader() : 'No Data Found'
                    }
                </div>

            </div>

            <Modal show={isModalShow} onHide={() => SetIisModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mb-3">
                        <label htmlFor="old_password" >Old password</label>
                        <input type="password" className="form-control" name="old_password" id="old_password" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="new_password" >New password</label>
                        <input type="password" className="form-control" name="new_password" id="new_password" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="confirm_password" >Confirm password</label>
                        <input type="password" className="form-control" name="confirm_password" id="confirm_password" />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => SetIisModalShow(false)} disabled={resetPasswordLoading} >Close</button>
                    <button className="btn btn-primary" onClick={() => changePassword()} disabled={resetPasswordLoading} >{ !resetPasswordLoading ? 'Change':'Loading ...'}</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile