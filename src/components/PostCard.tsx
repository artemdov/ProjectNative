import React, {useEffect, useState} from "react";
import {height as h, width as w} from "../consts/size";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {
    Card,
    Divider, Interaction, InteractionComment, InteractionHeart, InteractionText, InteractionWrapper,
    PostImg,
    PostText,
    PostTime,
    UserImg,
    UserInfo,
    UserInfoText,
    UserName
} from "../styles/FeedStyles";
import {useDispatch, useSelector} from "react-redux";
import {getUserSelector, setLikesDataSelector} from "../store/selectors";
import moment from "moment";
import firebase from "firebase";
import {setLikesData} from "../store/actions/feedAction";
import {Dispatch} from "redux";


export const PostCard: React.FC<any> = ({item, onDelete}) => {
    const [commentsCount, setCommentsCount] = useState(0)
    const likeData: any = useSelector(setLikesDataSelector)
    const dispatch = useDispatch()

    const user: any = useSelector(getUserSelector)
    console.log('item', item.likes)
    console.log('likeData', likeData)
    //const isLike = Object.keys(item.likes)

    const likeToggled = () => {
        firebase.database()
            .ref(`usersPost/${item.id}/likes/${item.id}_${user.uid}`)
            .set({
                liked: true,
            }).then(() => {
        })

        likeData.forEach((likeKey: string) => {
            if (likeKey === `${item.id}_${user.uid}`) {
                firebase.database()
                    .ref(`usersPost/${item.id}/likes/${item.id}_${likeKey}`)
                    .remove().then(() => {
                })
            }
        })
    }
    const fetchDataLikes = () => {
        const likesRef = firebase.database().ref(`usersPost/${item.id}/likes`)
        const onLoadingLikes = likesRef.on('value', (snapshot) => {
            const likeUserData: any = []
            snapshot.forEach((childSnapshot) => {
                console.log('snapshot', childSnapshot.val())
                likeUserData.push(childSnapshot.val())
                console.log('likeUserData', likeUserData.length)
            })
            dispatch(setLikesData(likeUserData))
        })
        return () => {
            likesRef.off('value', onLoadingLikes)
        }

    }
    useEffect(() => {
        fetchDataLikes()
    }, [])


    const likeIcon = user.uid && item.userId === user.uid ? (item.liked ? 'heart' : 'heart-outline')
        : (item.liked ? 'heart-outline' : 'heart')
    const likeIconColor = user.uid && item.userId === user.uid ? (item.liked ? '#333' : '#2e64e5')
        : (item.liked ? '#333' : '#2e64e5')
    return (
        <Card style={{width: w - 40}}>
            <UserInfo>
                <UserImg source={{uri: item.usersImg}}/>
                <UserInfoText>
                    <UserName>{item.usersName}</UserName>
                    <PostTime>{moment(item.postTime).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={{uri: item.postImg}}/> : <Divider style={{marginTop: h / 55}}/>}
            <InteractionWrapper>
                <Interaction onPress={() => {
                    likeToggled()
                }}>
                    <InteractionHeart>
                        <Ionicons name={likeIcon} size={24} color={likeIconColor}/>
                    </InteractionHeart>
                </Interaction>
                <InteractionText>{likeData.length}</InteractionText>
                <Interaction>
                    <InteractionComment>
                        <EvilIcons name="comment" size={30} color="#000"/>
                    </InteractionComment>
                </Interaction>
                <InteractionText>{commentsCount}</InteractionText>
                {user.uid && user.uid === item.userId ?
                    <Interaction onPress={() => onDelete(item.id)}>
                        <InteractionHeart>
                            <Ionicons name='trash-bin-outline' size={24} color="#000"/>
                        </InteractionHeart>
                    </Interaction> : null}
            </InteractionWrapper>
        </Card>
    )
}
