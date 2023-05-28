import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "../components/Profile/Profile/Profile";
import {setSearchData} from "../store/actions";

export function BrowsePage () {

    const searchData = useSelector(state => state.userData.searchData)
    const userId = useSelector(state => state.userData.searchData.userId);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`http://localhost:8080/profile/${userId}`);
            const userData = await response.json();
            dispatch(setSearchData(userData));
        };
        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <Profile buttonText="Read"
                 buttonColor="#000000"
                 textColor="#ffffff"
                 image={searchData.image}
                 name={searchData.name}
                 userName={searchData.userName}
                 date={searchData.date}
                 address={searchData.address}
                 followings={searchData.followings}
                 followers={searchData.followers}
                 userId={searchData.userId}
        />
    )
}