import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../components/Profile/Profile/Profile";
import { openEditModal, userUnfollow } from "../store/actions";
import { EditProfile } from "../components/EditProfile/EditProfile";

export function ProfilePage() {

    const userData = useSelector(state => state.userData.userData);
    const isEditModalOpen = useSelector(state => state.modal.isEditModal);
    const isFollow = useSelector(state => state.userData.followData.userFollow);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userUnfollow());
    }, [isFollow]);

    return (
        <>
            <Profile buttonText="Edit profile"
                     image={userData.image}
                     background={userData.background}
                     name={userData.name}
                     userName={userData.userName}
                     date={userData.date}
                     address={userData.address}
                     followings={userData.followings}
                     followers={userData.followers}
                     userId={userData.userId}
                     btnClick={() => dispatch(openEditModal())}
            />
            {isEditModalOpen &&
                (<EditProfile name={userData.name} userId={userData.userId} address={userData.address}
                              image={userData.image} background={userData.background} birthday={userData.birthday}/>)
            }
        </>
    );
}

