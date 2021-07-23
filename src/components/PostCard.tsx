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
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const likeData: any = useSelector(setLikesDataSelector)
    const dispatch = useDispatch()

    const user: any = useSelector(getUserSelector)

    const likeToggled = () => {
        firebase.database()
            .ref(`usersPost/${item.id}`)
            .update({
                liked: !item.liked
            }).then(() => console.log('Data updated.'))
        if (!item.liked) {
            firebase.database()
                .ref(`likes/${item.id}`)
                .set({
                    usersLikeId: item.userId,
                    postId: item.id,
                })
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            firebase.database()
                .ref(`likes/${item.id}`)
                .remove()
                .then(() => {
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    const fetchDataLikes = () => {
        const likesRef = firebase.database().ref('likes')
        const onLoadingLikes = likesRef.on('value', (snapshot) => {
            {
                const {postId, usersLikeId} = snapshot.val()
                likeData.push({
                    usersLikeId,
                    postId,
                })

            }
            dispatch(setLikesData(likeData))
        })
        return () => {
            likesRef.off('value', onLoadingLikes)
        }
    }
    fetchDataLikes()

    console.log('item', item)
    console.log('likeData', likeData)
    console.log()


    const likeIcon = item.liked ? 'heart' : 'heart-outline'
    const likeIconColor = item.liked ? '#2e64e5' : '#333'
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
                {user.uid === item.userId ?
                    <Interaction onPress={() => onDelete(item.id)}>
                        <InteractionHeart>
                            <Ionicons name='trash-bin-outline' size={24} color="#000"/>
                        </InteractionHeart>
                    </Interaction> : null}
            </InteractionWrapper>
        </Card>
    )
}
