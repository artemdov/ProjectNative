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
import {useSelector} from "react-redux";
import {getUserSelector} from "../store/selectors";
import moment from "moment";
import firebase from "firebase";


export const PostCard: React.FC<any> = ({item, onDelete}) => {

    const [commentsCount, setCommentsCount] = useState(0)
    const [commentsValue, setCommentsValue] = useState(0)

    const user: any = useSelector(getUserSelector)
    let isLike: any
    if (item.likes) {
        isLike = (Object.keys(item.likes))
    }

    const likeToggled = () => {
        if (!item.likes) {
            firebase.database()
                .ref(`usersPost/${item.id}/likes/${user.uid}`)
                .set({
                    isLike: true,
                }).then(() => {
                if (item.likes) {
                    isLike.push(Object.keys(item.likes))
                }
            })
        } else {
            isLike.forEach(async (likeKey: string) => {
                if (likeKey === `${user.uid}`) {
                    await firebase.database()
                        .ref(`usersPost/${item.id}/likes/${user.uid}`)
                        .remove().then(() => {
                        })
                    return
                } else {
                    if (likeKey !== `${user.uid}`) {
                        await firebase.database()
                            .ref(`usersPost/${item.id}/likes/${user.uid}`)
                            .set({
                                isLike: true,
                            }).then(() => {
                            })
                    }
                }
            })
        }

    }
    let isLikedHeart
    if (isLike) {
        isLike.forEach(async (likeKey: string) => {
            isLikedHeart = likeKey
        })
    }
    const likeIcon = isLikedHeart && isLikedHeart === `${user.uid}` ? 'heart' : 'heart-outline'
    const likeIconColor = isLikedHeart && isLikedHeart === `${user.uid}` ? '#2e64e5' : '#333'
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
            {item.postImg != null ? <PostImg source={{uri: item.postImg}}/> :
                <Divider style={{marginTop: h / 55}}/>}
            <InteractionWrapper>
                <Interaction onPress={() => {
                    likeToggled()
                }}>
                    <InteractionHeart>
                        <Ionicons name={likeIcon} size={24} color={likeIconColor}/>
                    </InteractionHeart>
                </Interaction>
                <InteractionText>{isLike ? isLike.length : 0}</InteractionText>
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
