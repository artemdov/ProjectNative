import styled from "styled-components/native";

export const Container = styled.View`
        flex: 1;
        background-color: #fff;
        align-items: center;
`;
export const Card = styled.View`
        background-color: #f8f8f8;
        margin-bottom: 20px;
        border-radius: 10px;
    `;
export const UserInfo = styled.View`
        flex-direction: row;
        justify-content: flex-start;
        padding: 15px;
    `;
export const UserImg = styled.Image`
        width: 50px;
        height: 50px;
        borderRadius: 25px;
    `;
export const UserInfoText = styled.View`
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
    `;
export const UserName = styled.Text`
        font-size: 14px;
        font-weight: bold;
    `;
export const PostTime = styled.Text`
        font-size: 12px;
        color: #666;
    `;
export const PostText = styled.Text`
        font-size: 14px;
        padding-left: 15px;
        padding-right: 15px;
    `;
export const PostImg = styled.Image`
        width: 100%;
        height: 250px;
        margin-top: 15px;
    `;
export const Divider = styled.View`
        border-bottom-color: #dddddd;
        border-bottom-width: 1px;
        width: 93%;
        align-self: center;
    `;
export const InteractionWrapper = styled.View`
        flex-direction: row;
        justify-content: flex-start;
        padding: 15px;
    `;
export const Interaction = styled.TouchableOpacity`
    `;
export const InteractionHeart = styled.View`
        padding: 5px;
        color: #333;
        margin-top: 5px;
    `;
export const InteractionComment = styled.View`
        padding: 5px;
        color: #333;
        margin-top: 5px;
    `;
export const InteractionText = styled.Text`
        margin-top: 10px;
        font-size: 18px;
        margin-right: 8px;

    `;



