import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "../components/Profile/Profile/Profile";
import {setSearchData, userFollow} from "../store/actions";
import {fetchFollow} from "../store/Thunks/fetchFollowThunk";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../apiConfig";

export function BrowsePage () {

    const isFollow = useSelector(state => state.userData.followData.userFollow)
    const searchData = useSelector(state => state.userData.searchData)
    const searchId = useSelector(state => state.userData.searchData.userId);
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`${apiUrl}/profile/${searchId}`);
            const userData = await response.json();
            dispatch(setSearchData(userData));
        };
        if (searchId) {
            fetchData();
        }
    }, [searchId, isFollow]);


    return (
        <>
        {userId === searchId ?
            navigate("/profile")
            :
            <Profile buttonText="Subscribe"
                 image={searchData.image}
                 name={searchData.name}
                 userName={searchData.userName}
                 date={searchData.date}
                 address={searchData.address}
                 followings={searchData.followings}
                 followers={searchData.followers}
                 userId={searchData.userId}
                 btnClick={() => dispatch(fetchFollow())}
            />
        }
        </>
    )
}