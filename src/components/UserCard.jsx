const UserCard = ({ user, onAction }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photoURL, age, gender, about, skills } = user;

  return (
    <div className="card card-side bg-base-100 shadow-xl max-w-2xl w-full my-4 hover:shadow-2xl transition-all duration-300">
      <figure className="w-1/3 min-w-[200px]">
        <img
          src={photoURL || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body w-2/3 bg-gray-300">
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
          {age && <span className="text-gray-400 font-normal text-lg">, {age}</span>}
        </h2>
        {gender && (
          <span className="badge badge-secondary badge-outline capitalize font-semibold mb-2 self-start">
            {gender}
          </span>
        )}
        <p className="text-gray-500 text-sm max-h-24 overflow-y-auto mb-4">
          {about || "No bio description provided."}
        </p>
        
        {skills && skills.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-1">Skills:</h3>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-neutral text-xs">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {onAction && (
          <div className="card-actions justify-start gap-4 mt-auto">
            <button
              onClick={() => onAction("ignored", _id)}
              className="btn btn-error btn-outline px-6"
            >
              Ignore
            </button>
            <button
              onClick={() => onAction("interested", _id)}
              className="btn btn-success px-6"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
