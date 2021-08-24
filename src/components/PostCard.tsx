import React, {useEffect, useState} from 'react';
import {rem} from '../consts/size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCommentsSelector,
    getEditedUserInfoSelector,
    getUserInfoSelector,
    getUserSelector,
    isCommentVisibleSelector,
} from '../store/selectors';
import moment from 'moment';
import firebase from 'firebase';
import {CommentInput} from './CommentInput';
import {Comment} from './Comment';
import {setCommentMenuVisible, setComments} from '../store/actions/feedAction';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {photoUserProfile} from "../utils/helpers";
import {setEditedUserInfo, setTransferredUserImage, setUserInfo} from "../store/actions/editUserAction";

export const PostCard: React.FC<any> = ({item, onDelete, onPress}) => {
    const dispatch = useDispatch();
    const comments = useSelector(getCommentsSelector);
    const user: any = useSelector(getUserSelector);
   // const editUserInfo: any = useSelector(getEditedUserInfoSelector)
    const isCommentVisibleMenu = useSelector(isCommentVisibleSelector);
    let [likes, setLikes] = useState<any>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    console.log('currentUser', currentUser)
   // console.log('editUserInfo', editUserInfo)
    const getUser = async () => {
        await firebase
            .database()
            .ref(`users/${item.userId}`)
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    console.log('snapshot', snapshot.val())
                    //dispatch(setEditedUserInfo(snapshot.val()))
                    setCurrentUser(snapshot.val())
                }
            })
    }

    const fetchComments = () => {
        const postCommentsRef = firebase.database().ref('comments/');
        const onLoadingComments = postCommentsRef.on('value', snapshot => {
            const commentsMap: any = [];
            snapshot.forEach(childSnapshot => {
                const {comment, createdAt, postId, userId, userName, userImage} =
                    childSnapshot.val();
                commentsMap.push({
                    comment,
                    createdAt,
                    postId,
                    userId,
                    userName,
                    userImage,
                });
            });
            dispatch(setComments(commentsMap));
        });
        return () => {
            postCommentsRef.off('value', onLoadingComments);
        };
    };

    useEffect(() => {
        getUser().then(() => console.log('user success'));
        fetchComments();
    }, []);

    useEffect(() => {
        if (item.likes) {
            setLikes(Object.keys(item.likes));
        } else {
            setLikes([]);
        }
    }, []);

    const likeToggled = () => {
        if (likes.length === 0) {
            firebase
                .database()
                .ref(`usersPost/${item.id}/likes/${user.uid}`)
                .set({
                    isLike: true,
                })
                .then(() => {
                    setLikes([...likes, `${user.uid}`]);
                    console.log('likes1', likes);
                });
        } else {
            likes.forEach(async (likeKey: string) => {
                if (likeKey === `${user.uid}`) {
                    await firebase
                        .database()
                        .ref(`usersPost/${item.id}/likes/${user.uid}`)
                        .remove()
                        .then(() => {
                            setLikes(likes.filter((item: any) => item !== user.uid));
                            console.log('likes2', likes);
                        });
                }
                if (likeKey !== `${user.uid}`) {
                    await firebase
                        .database()
                        .ref(`usersPost/${item.id}/likes/${user.uid}`)
                        .set({
                            isLike: true,
                        })
                        .then(() => {
                            setLikes([...likes, `${user.uid}`]);
                            console.log('likes3', likes);
                        });
                }
            });
        }
    };

    const commentHandler = () => {
        dispatch(setCommentMenuVisible(!isCommentVisibleMenu));
    };

    const deletePostHandler = () => onDelete(item.id);

    const isPostLiked =
        likes && likes.find((userId: string) => user && userId === user.uid);

    const likeIcon = isPostLiked ? 'heart' : 'heart-outline';

    const likeIconColor = isPostLiked ? '#2e64e5' : '#333';

    const commentsFromUsersId: any[] = [];
    comments.forEach((comment: any) => {
        for (let value in comment) {
            if (item.id === comment[value]) {
                commentsFromUsersId.push(item.id);
            }
        }
    });

    return (
        <View style={styles.card} key={item.id}>
            <View style={styles.userInfo}>
                <Image style={styles.userImage}
                       source={{uri: currentUser && currentUser.userImage || photoUserProfile}}/>
                <View style={styles.userInfoText}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.userName}>{currentUser && currentUser.firstName || 'Без имени'}
                        {' '}{currentUser && currentUser.firstName && currentUser.lastName || ''}</Text>
                    </TouchableOpacity>
                    <Text style={styles.postTime}>{moment(item.postTime).fromNow()}</Text>
                </View>
            </View>
            <Text style={styles.postText}>{item.post}</Text>
            {item.postImg ? (
                <Image style={styles.postImg} source={{uri: item.postImg}}/>
            ) : (
                <View style={styles.divider}/>
            )}
            <View style={styles.interactionWrapper}>
                <TouchableOpacity onPress={likeToggled}>
                    <View style={styles.interactionHeart}>
                        <Ionicons name={likeIcon} size={24} color={likeIconColor}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.interactionText}>{likes.length}</Text>
                <TouchableOpacity onPress={commentHandler}>
                    <View style={styles.interactionComment}>
                        <EvilIcons name="comment" size={30} color="#000"/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.interactionText}>{commentsFromUsersId.length}</Text>
                {user && user.uid === item.userId && (
                    <TouchableOpacity onPress={deletePostHandler}>
                        <View style={styles.interactionHeart}>
                            <Ionicons name="trash-bin-outline" size={24} color="#000"/>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            {isCommentVisibleMenu && (
                <View>
                    <CommentInput item={item}/>
                    {comments &&
                    comments.map((comment: any) => {
                        if (item.id === comment.postId) {
                            return (
                                <Comment
                                    key={comment.createdAt}
                                    userImage={comment.userImage}
                                    userName={comment.userName}
                                    createdAt={comment.createdAt}
                                    comment={comment.comment}
                                />
                            );
                        }
                    })}
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        marginBottom: rem(15),
        borderRadius: rem(15),
        width: rem(360),
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: rem(15),
    },
    userImage: {
        width: rem(50),
        height: rem(50),
        borderRadius: rem(30),
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: rem(10),
    },
    userName: {
        fontSize: rem(14),
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: rem(12),
        color: '#666',
    },
    postText: {
        fontSize: rem(14),
        paddingHorizontal: rem(15),
    },
    postImg: {
        width: '100%',
        height: 250,
        marginTop: rem(14),
    },
    divider: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '93%',
        alignSelf: 'center',
        marginTop: rem(10),
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: rem(10),
    },
    interactionHeart: {
        padding: rem(5),
        color: '#333',
        marginTop: rem(5),
    },
    interactionComment: {
        padding: rem(5),
        color: '#333',
        marginTop: rem(5),
    },
    interactionText: {
        marginTop: rem(10),
        fontSize: rem(18),
        marginRight: rem(8),
    },
    statusLoadingWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
