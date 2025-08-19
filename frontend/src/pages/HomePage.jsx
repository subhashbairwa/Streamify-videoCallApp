import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";

import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { capitalize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // fetch friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // fetch recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // fetch outgoing friend requests
  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // mutation for sending request
  const { mutate: sendRequestMutation} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: (data, userId) => {
      // turant update local state -> UI instant update hoga
      setOutgoingRequestsIds((prev) => new Set(prev).add(userId));

      // backend se latest data lene ke liye invalidate
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  // update state from query
  useEffect(() => {
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      const outgoingIds = new Set();
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
 <div className="min-h-screen p-4 sm:p-6 lg:p-8">
  <div className="container mx-auto space-y-10">
    {/* Friends Section */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
        Your Friends
      </h2>
      <Link to="/notifications" className="btn btn-outline btn-sm w-full sm:w-auto flex justify-center sm:justify-start">
        <UsersIcon className="mr-2 h-4 w-4" />
        Friend Requests
      </Link>
    </div>

    {loadingFriends ? (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    ) : friends.length === 0 ? (
      <NoFriendsFound />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    )}

    {/* Recommended Users Section */}
    <section>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Meet New Learners
            </h2>
            <p className="opacity-70 text-sm sm:text-base">
              Discover perfect language exchange partners based on your profile
            </p>
          </div>
        </div>
      </div>

      {loadingUsers ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : recommendedUsers.length === 0 ? (
        <div className="card bg-base-200 p-4 sm:p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
          <p className="text-base-content opacity-70 text-sm sm:text-base">
            Check back later for new language partners!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recommendedUsers.map((user) => {
            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

            return (
              <div
                key={user._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-4 sm:p-5 space-y-3 sm:space-y-4">
                  {/* Profile Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="avatar w-12 h-12 sm:w-16 sm:h-16 rounded-full">
                      <img src={user.profilePic} alt={user.fullName} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-lg">{user.fullName}</h3>
                      {user.location && (
                        <div className="flex items-center text-xs sm:text-sm opacity-70 mt-1">
                          <MapPinIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1">
                    <span className="badge badge-secondary text-xs sm:text-sm">
                      {getLanguageFlag(user.nativeLanguage)} Native: {capitalize(user.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline text-xs sm:text-sm">
                      {getLanguageFlag(user.learningLanguage)} Learning: {capitalize(user.learningLanguage)}
                    </span>
                  </div>

                  {user.bio && (
                    <p className="text-xs sm:text-sm opacity-70">{user.bio}</p>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent}
                    className={`btn w-full ${hasRequestBeenSent ? "btn-disabled bg-gray-400" : "btn-primary"}`}
                  >
                    {hasRequestBeenSent ? "Request Sent" : "Send Friend Request"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  </div>
</div>

  );
};

export default HomePage;
