const serverUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const loginUser = async (formData) => {
  console.log(serverUrl)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${serverUrl}/auth/signIn`, options);
    const jsonRes = await response.json();
    return jsonRes;

    // return { ok: response.ok, data: jsonRes };
  } catch (err) {
    console.error("Login Fetch Error:", err);
    return {
      success: false,
      msg: "Something went wrong. Please try again.",
    };
  }
};

export default loginUser;
