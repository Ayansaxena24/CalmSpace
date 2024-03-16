import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import matrixVideo from "../../images/matrixVideo.mp4";
import man from "../../images/man.png";
import woman from "../../images/woman.png";
import { Tilt } from "react-tilt";
import ReactFlipCard from "reactjs-flip-card";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 10, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const UserInfoDashboard = () => {
  const { userInfo: user } = useSelector((state) => state.userProfile);
  const { palette } = useTheme();
  const { mode } = useSelector((state) => state.mode);

  const navigationToDrive = () => {
    user && user.resumeLink
      ? window.open(user.resumeLink)
      : window.open("https://drive.google.com/drive/my-drive");
  };

  const styles = {
    card: {
      innerWidth: "full",
      innerHeight: "full",
      outerWidth: "full",
      outerHeight: "full",
      transition: 'transform 3s',
    },
  };
  return (
    <div className="overflow-hidden">
      <Box
      // className = "w-[100%] h-[600px]"
      // sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}
      >
        <Card
        // className='relative min-w-[275] bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r hover:bg-gradient-to-tr hover:from-gray-900 hover:to-gray-600 hover:bg-gradient-to-r duration-300 ease-in-out'
        // sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}
        >
          {/* <img autoplay="true" muted loop src={matrixVideo} className=" z-10 w-[100%] h-[100%] object-cover relative opacity-50"/> */}
          <CardContent
            className={` min-h-[650px] z-10  ${
              mode === "dark"
                ? "bg-[#1E1E1E]"
                : "bg-gray-300 bg-gradient-to-r from-[#3c1053] to-[#ad5389]"
            }`}
          >
            <div>
              <div className="flex flex-col">
                <Typography
                  sx={{ fontSize: 32 }}
                  gutterBottom
                  className="text-white"
                >
                  Personal Info
                </Typography>
                <hr style={{ marginBottom: "30px", color: "blue" }} />
              </div>
              <div className="pt-4 flex flex-row">
                {user && user.gender == "Male" ? (
                  <img src={man} className="h-96 w-96 mr-10" />
                ) : (
                  <img src={woman} className="h-96 w-96 mr-10" />
                )}
                <ReactFlipCard
                  className="w-[80vh]"
                  direction="horizontal"
                  transitionDuration="0.8"
                  flipTrigger="onClick"
                  frontComponent={
                    <Tilt
                      options={defaultOptions}
                      className={`relative pl-10 border-1 border-blue-200 rounded-2xl pt-8 w-[100vh] h-[72vh] ${
                        mode === "dark"
                          ? "bg-gradient-to-r from-[#001510] to-[#00bf8f]"
                          : " bg-gradient-to-r from-[#a0467c] to-[#7327a5]"
                      }`}
                    >
                      <div className="h-80 grid grid-cols-2">
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          Name: {user && user.firstName} {user && user.lastName}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                          // className="border-1 rounded-md border-gray-400 p-2 z-30"
                        >
                          E-mail : {user && user.email}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          Age : {user && user.age}
                        </Typography>
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Qualification : {user && user.qualification}
                          </Typography>
                        ) : user && user.role === 2 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Recruiting As : {user && user.hiringAs}
                          </Typography>
                        ) : user && user.role === 1 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Server Status : Working
                          </Typography>
                        ) : (
                          ""
                        )}
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            College : {user && user.highestEducation}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Joined : {user && user.createdAt}
                          </Typography>
                        )}
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            CGPA : {user && user.cgpaUG}
                          </Typography>
                        ) : (
                          ""
                        )}
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          Status:{" "}
                          {user && user.role === 0
                            ? "Regular user"
                            : user && user.role === 1
                            ? "Admin"
                            : "Creator"}
                        </Typography>
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            XII Percentage:{" "}
                            {user && user.marksTwelth ? user.marksTwelth : "NA"}
                            %
                          </Typography>
                        ) : (
                          ""
                        )}
                      </div>
                      <hr className="absolute left-1 scale-95 w-full bottom-14 bg-white p-0.15 mb-2"></hr>
                      <div className="flex justify-center items-center pb-4">
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                          onClick={navigationToDrive}
                          className={` cursor-pointer duration:300 ease-in-out ${
                            mode === "dark"
                              ? "hover:text-green-500"
                              : "hover:text-purple-500"
                          }`}
                        >
                          {user && user.resumeLink ? "Show Resume" : ""}
                        </Typography>
                      </div>
                    </Tilt>
                  }
                  backComponent={
                    <Tilt
                      options={defaultOptions}
                      className={`relative pl-10 border-1 border-blue-200 rounded-2xl pt-8 w-[100vh] h-[72vh] ${
                        mode === "dark"
                          ? "bg-gradient-to-r from-[#001510] to-[#00bf8f]"
                          : " bg-gradient-to-r from-[#a0467c] to-[#7327a5]"
                      }`}
                    >
                      <div className="h-80 grid grid-cols-2">
                      {user && user.role === 0 ? (
                        <>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          Highest Education: {user && user.highestEducation} 
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                          // className="border-1 rounded-md border-gray-400 p-2 z-30"
                        >
                          Qualification : {user && user.qualification}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          10th CGPA / % : {user && user.marksTenth}
                        </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Qualification : {user && user.qualification}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            XII Percentage:{" "}
                            {user && user.marksTwelth ? user.marksTwelth : "NA"}
                            %
                          </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}
                          >
                          Skills :
                          {user && user.skills.map((skill, index) => (
                            <span key={index}>{skill}</span>
                           ))}
                          </Typography>
                          </>
                        ) : user && user.role === 2 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Recruiting As : {user && user.hiringAs}
                          </Typography>
                        ) : user && user.role === 1 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Server Status : Working
                          </Typography>
                        ) : (
                          ""
                        )}
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            College : {user && user.highestEducation}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            Joined : {user && user.createdAt}
                          </Typography>
                        )}
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            CGPA : {user && user.cgpaUG}
                          </Typography>
                        ) : (
                          ""
                        )}
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                        >
                          Status:{" "}
                          {user && user.role === 0
                            ? "Regular user"
                            : user && user.role === 1
                            ? "Admin"
                            : "Creator"}
                        </Typography>
                        {user && user.role === 0 ? (
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#fafafa" }}
                          >
                            XII Percentage:{" "}
                            {user && user.marksTwelth ? user.marksTwelth : "NA"}
                            %
                          </Typography>
                        ) : (
                          ""
                        )}
                      </div>
                      <hr className="absolute left-1 scale-95 w-full bottom-14 bg-white p-0.15 mb-2"></hr>
                      <div className="flex justify-center items-center pb-4">
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ color: "#fafafa" }}
                          onClick={navigationToDrive}
                          className={` cursor-pointer duration:300 ease-in-out ${
                            mode === "dark"
                              ? "hover:text-green-500"
                              : "hover:text-purple-500"
                          }`}
                        >
                          {user && user.resumeLink ? "Show Resume" : ""}
                        </Typography>
                      </div>
                    </Tilt>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default UserInfoDashboard;
