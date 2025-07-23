const serverUrl = import.meta.env.BACKEND_SERVER_URL;

const resetPassword = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${serverUrl}/auth/passwordReset/reset-password`, options);
    const jsonRes = await response.json();
    // return { ok: response.ok, data: jsonRes };
  } catch (error) {
    console.error("Reset Password Error:", error);
    return {
      ok: false,
      data: { msg: "Something went wrong. Please try again." },
    };
  }
};

export default resetPassword;
