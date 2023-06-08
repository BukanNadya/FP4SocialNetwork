import React, {useEffect, useState} from 'react';
import {SubscriptionButton} from "../SubscriptionButton/SubscriptionButton";
import {UnSubscriptionButton} from "../UnSubscriptionButton/UnSubscriptionButton";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";


export function ToggleButton ({width, height, searchId}) {

    const userId = useSelector(state => state.userData.userData.userId);
    const [isFollow, setIsFollow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchIsFollow = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:8080/api/isfollowing`, {
                    method: "POST",
                    body: JSON.stringify({
                        userFollower: userId,
                        userFollowing: searchId,
                    }),
                    headers: {"Content-Type": "application/json"}
                });
                const userIsFollow = await response.json();
                if (userIsFollow.following === "true") {
                    setIsFollow(true)
                } else if (userIsFollow.following === "false") {
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
                <UnSubscriptionButton width={width} height={height} searchId={searchId} btnClick={() => setIsFollow(true)}/>
                :
                <SubscriptionButton width={width} height={height} searchId={searchId} btnClick={() => setIsFollow(false)}/>
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