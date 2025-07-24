const serverUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const registerUser = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `http://192.168.29.137:8082/auth/signUp`,
      options
    );
    const jsonRes = await response.json();
    return jsonRes;
    // return { ok: response.ok, data: jsonRes };
  } catch (err) {
    console.error("Signup Fetch Error:", err);
    return { success: false, msg: "Something went wrong. Please try again." };
  }
};

export default registerUser;
