import React, {useEffect, useState} from 'react';
import {SubscriptionButton} from "../SubscriptionButton/SubscriptionButton";
import {UnSubscriptionButton} from "../UnSubscriptionButton/UnSubscriptionButton";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../../apiConfig";


export function ToggleButton ({width, height, searchId}) {

    const userId = useSelector(state => state.userData.userData.userId);
    const [isFollow, setIsFollow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userIsFollow = useSelector(state => state.userData.userFollowing.following);

    useEffect(() => {
        // const fetchIsFollow = async () => {
        //     try {
        //         setIsLoading(true)
        //         const response = await fetch(`${apiUrl}/api/isfollowing`, {
        //             method: "POST",
        //             body: JSON.stringify({
        //                 userFollower: userId,
        //                 userFollowing: searchId,
        //             }),
        //             headers: {"Content-Type": "application/json"}
        //         });
        //         const userIsFollow = await response.json();
        //         if (userIsFollow.following === "true") {
        //             setIsFollow(true)
        //         } else if (userIsFollow.following === "false") {
        //             setIsFollow(false)
        //         }
        //     } catch (error) {
        //         console.error("An error occurred:", error);
        //     } finally {
        //         setIsLoading(false)
        //     }
        //
        // };
        // if (searchId) {
        //     fetchIsFollow();
        // }


        const fetchIsFollow = async () => {
            try {
                setIsLoading(true)
                const users = userIsFollow.filter(el => searchId === el)
                if (users.length > 0) {
                            console.log("true")
                            setIsFollow(true)
                        } else {
                            console.log("false")
                            setIsFollow(false)
                        }

            } catch (error) {
                console.error("An error occurred:", error);
            } finally {
                setIsLoading(false)
            }

        };
        if (searchId) {
            fetchIsFollow();
        }

    }, [])

    return (
        <>
            {userId === searchId ? false :
        <>
            {isLoading ? <CircularProgress sx={{ marginRight: "50px", alignSelf:"center" }}/> :
        <>
            {isFollow ?
                <UnSubscriptionButton width={width} height={height} searchId={searchId} btnClick={() => setIsFollow(false)}/>
                :
                <SubscriptionButton width={width} height={height} searchId={searchId} btnClick={() => setIsFollow(true)}/>
            }
        </>
            }
        </>
            }
        </>
    )
}

ToggleButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    searchId: PropTypes.string,
}