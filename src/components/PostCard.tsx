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


export const PostCard: React.FC<any> = ({item}) => {

    const likeIcon = item.liked ? 'heart' : 'heart-outline'
    const likeIconColor = item.liked ? '#2e64e5' : '#333'

    return (
        <Card style={{width: w - 40}}>
            <UserInfo>
                <UserImg source={item.usersImg}/>
                <UserInfoText>
                    <UserName>{item.usersName}</UserName>
                    <PostTime>{item.postsTime}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.posts}</PostText>
            {item.postImg != 'none' ? <PostImg source={item.postImg}/> : <Divider style={{marginTop: h / 55}}/>}
            <InteractionWrapper>
                <InteractionHeart>
                    <Ionicons name={likeIcon} size={24} color={likeIconColor}/>
                </InteractionHeart>
                <InteractionText>{item.likes}</InteractionText>
                <InteractionComment>
                    <EvilIcons name="comment" size={30} color="#000"/>
                </InteractionComment>
                <InteractionText>{item.comments}</InteractionText>

            </InteractionWrapper>
        </Card>
    )
}
