import React from "react";
import {height as h, width as w} from "../consts/size";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {
    Card,
    Divider, Interaction, InteractionHeart, InteractionText, InteractionWrapper,
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
            <Interaction>
                <InteractionHeart style={{marginRight: h / 90}}>
                    <Ionicons name="heart-outline" size={24} color="black"/>
                </InteractionHeart>
                <InteractionText style={{fontSize: h / 40}}>Лайк</InteractionText>
            </Interaction>
            <Interaction>
                <InteractionHeart style={{marginRight: h / 90}}>
                    <EvilIcons name="comment" size={30} color="black"/>
                </InteractionHeart>
                <InteractionText style={{fontSize: h / 40}}>Комментарии</InteractionText>
            </Interaction>
        </InteractionWrapper>
    </Card>
)
