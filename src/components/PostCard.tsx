import React from "react";
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
import {getUserSelector} from "../store/selectors";
import moment from "moment";
import {Alert} from "react-native";
import firebase from "firebase";
import {isLoadingPostValue, setPostData} from "../store/actions/feedAction";


export const PostCard: React.FC<any> = ({item, onDelete}) => {


    const user: any = useSelector(getUserSelector)
    const likeToggled = (post: any) => {
        console.log(post)
        /*firebase.database()
            .ref(`usersPost/${key}`)
            .update({
                liked: !liked
            }).then(() => console.log('Data updated.'));*/
        firebase.database()
            .ref('usersPost/')
            .on('value', snapshot => {
                snapshot.forEach((childSnapshot) => {
                    console.log('ChlSnapshot', childSnapshot.ref.key)

                    })
                })
    }

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
                    likeToggled(item.liked)
                }}>
                    <InteractionHeart>
                        <Ionicons name={likeIcon} size={24} color={likeIconColor}/>
                    </InteractionHeart>
                </Interaction>
                <InteractionText>{item.likes}</InteractionText>
                <Interaction>
                    <InteractionComment>
                        <EvilIcons name="comment" size={30} color="#000"/>
                    </InteractionComment>
                </Interaction>
                <InteractionText>{item.comments}</InteractionText>
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
