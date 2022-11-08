import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

import PrivatePageWrapper from '../../components/PrivatePageWrapper';
import ModalChange from '../../common/ModalChange';

import {initUsername, initImage} from '../../redux/slices/auth';
import {getShortAddress} from "../../functions/auth";
import {changeNick, changeImage} from '../../functions/user';
import {copyText} from '../../functions/utils';

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [modal, setModal] = React.useState(false);
    const [nick, setNick] = React.useState("");
    const [imageLoad, setImageLoad] = React.useState(false);

    const changeNickname = () => {
        const res = changeNick(auth.accessToken, nick);
        
        res.then(data => {
            dispatch(initUsername(data.data.username));
        }).catch(e => {
            console.log(e);
        });
    }

    const changeImageProfile = (e) => {
        setImageLoad(true);
        let formData = new FormData();
        formData.append("image", e.target.files[0]);

        const res = changeImage(auth.accessToken, formData);

        res.then(data => {
            dispatch(initImage(data.data.image_url));
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setImageLoad(false);
        });
    }

    return (
        <PrivatePageWrapper>
            <section className="profile">
                <div className="container">
                    <div className="profile__inner">
                        <div className="profile__buttons">
                            <button className="button profile__share">
                                <img src="/assets/img/share.svg" alt="share" className="profile__share--icon" />
                            </button>

                            <button className="button profile__share">
                                <img src="/assets/img/dots-white.svg" alt="dots" className="profile__share--icon" />
                            </button>
                        </div>

                        <div className="profile__ava--inner">
                            <input type="file" id="profile__ava" className="file" accept="image/png, image/gif, image/jpeg" onChange={changeImageProfile} />

                            {imageLoad
                            ? <div className="profile__ava--img--inner">
                                Загрузка..
                            </div>
                            : <label htmlFor="profile__ava" className="profile__ava--img--inner">
                                <img src={auth.image ? auth.image : `/assets/img/avatar.png`} alt="avatar" className="profile__ava--img" />
                            </label>}

                            <button className="button profile__settings" onClick={() => setModal(true)}>
                                <img src="/assets/img/settings.svg" alt="settings" className="profile__settings--icon" />
                            </button>
                        </div>

                        <p className="profile__name">{auth.username}</p>

                        <div className="profile__wrap">
                            <div className="profile__wallet" onClick={() => copyText(auth.walletAddress)}>
                                <img src="/assets/img/eth.svg" alt="eth" className="eth" />

                                {getShortAddress(auth.walletAddress)}
                            </div>

                            <p className="profile__date">Joined {auth.created}</p>
                        </div>

                        <div className="collection__items--content">
                            {/* Данные карточек тут */}
                        </div>

                        <div className="collection__items--none">
                            No items to display
                        </div>
                    </div>
                </div>
            </section>

            <ModalChange active={modal} setActive={setModal} placeholder="Enter new nickname" value={nick} setValue={setNick} callback={changeNickname} />
        </PrivatePageWrapper>
    );
};

export default Profile;
