import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import FriendCard from "../components/friendCard/FriendCard";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';

interface Friend {
  _id: string;
  username: string;
  profileInfo: {
    gender: 'Erkek' | 'Kadın';
    age: number;
  };
}

const Friends: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/login");
    console.log('logout');
  };

  const handleAddFriend = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:5000/api/send-friend-request/${username}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      console.log(response.data);
      // Optionally, you can refetch the friends list after sending a friend request
      await fetchFriendsAndRequests();
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptFriendRequest = async (senderId: string) => {
    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:5000/api/accept-friend-request/${senderId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      console.log(response.data);
      // Optionally, you can refetch the friends list after accepting the friend request
      await fetchFriendsAndRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const fetchFriendsAndRequests = async () => {
    try {
      const response: AxiosResponse<Friend[]> = await axios.get('http://localhost:5000/api/friends', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log("friends" + response.data);
      const receivedRequestsResponse: AxiosResponse<Friend[]> = await axios.get('http://localhost:5000/api/get-received-friend-requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log("requests" + receivedRequestsResponse.data);

      setFriends(response.data);
      setFriendRequests(receivedRequestsResponse.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching friends and requests:', error);
      setFriends([]);
      setFriendRequests([]);
      setLoading(false);
      setError('Error fetching friends and requests. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch friends and requests on mount
    fetchFriendsAndRequests();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <>
      <Navbar />
      <button
        onClick={handleImageClick}
        style={{
          backgroundColor: "transparent",
          border: "none",
          position: "absolute",
          top: "5%",
          right: "5%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
      >
        <img
          src={LogoutIcon}
          alt="LogoutIcon"
        />
      </button>
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-9 ms-5">
          <div className="mt-4">
            <input
              type="text"
              placeholder="Kullanıcı adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn btn-primary ms-2" onClick={handleAddFriend}>
              Arkadaş Ekle
            </button>
          </div>
          {loading && <p>Loading friends...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <div className="row mx-auto">
              <div className="col-md-6">
                <h2>Friend Requests</h2>
                {/* Display Friend Requests */}
                {friendRequests.map((request, index) => (
                  <div key={index} className="friend-card">
                    <FriendCard name={request.username} gender={request.profileInfo.gender} />
                    <button onClick={() => handleAcceptFriendRequest(request._id)}>Accept</button>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h2>Friends</h2>
                {/* Display Friends */}
                {friends.map((friend, index) => (
                  <FriendCard key={index} name={friend.username} gender={friend.profileInfo.gender} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Friends;
