const serverUrl = import.meta.env.BACKEND_SERVER_URL;

const forgotPassword = async (email) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };

  try {
    const response = await fetch(`${serverUrl}/auth/passwordReset/request`, options);
    const jsonRes = await response.json();
    // return { ok: response.ok, data: jsonRes };
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return {
      success: false,
      msg: "Something went wrong. Please try again." ,
    };
  }
};

export default forgotPassword;
