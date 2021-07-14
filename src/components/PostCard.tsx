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


export const PostCard: React.FC<any> = ({item}) => (
    <Card style={{width: w - 40}}>
        <UserInfo>
            <UserImg source={item.usersImg}/>
            <UserInfoText>
                <UserName>{item.usersName}</UserName>
                <PostTime>{item.postsTime}</PostTime>
            </UserInfoText>
        </UserInfo>
        <PostText>{item.posts}</PostText>
        <PostImg source={item.postImg}/>
        <Divider style={{marginTop: h / 55}}/>
        <InteractionWrapper>
            <InteractionHeart>
                <Ionicons name="heart" size={24} color="#2e64e5"/>
            </InteractionHeart>
            <InteractionText>{item.likes}</InteractionText>

            <InteractionComment>
                <EvilIcons name="comment" size={30} color="#000"/>
            </InteractionComment>
            <InteractionText>{item.comments}</InteractionText>

        </InteractionWrapper>
    </Card>
)
