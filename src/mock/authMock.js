const MOCK_OTP = "123456";

export const mockRegister = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  localStorage.setItem(
    "mockUser",
    JSON.stringify({
      id: "mock-user-001",
      name: data.name,
      email: data.email,
    })
  );

  return {
    data: {
      success: true,
      message: "Verification code sent successfully.",
    },
  };
};

export const mockVerifyEmail = async ({ email, otp }) => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (otp !== MOCK_OTP) {
    const error = new Error("Invalid OTP");

    error.response = {
      status: 400,
      data: {
        message: "Invalid verification code. Please try again.",
      },
    };

    throw error;
  }

  const user = JSON.parse(
    localStorage.getItem("mockUser")
  );

  const token = "mock-jwt-token";

  localStorage.setItem("token", token);

  localStorage.setItem(
    "mockUser",
    JSON.stringify({
      ...user,
      email,
      verified: true,
    })
  );

  return {
    data: {
      success: true,
      data: {
        token,
        user: {
          ...user,
          email,
          verified: true,
        },
      },
    },
  };
};

export const mockResendOtp = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: {
      success: true,
      message: "Verification code resent successfully.",
    },
  };
};

export const mockLogin = async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const user = JSON.parse(
    localStorage.getItem("mockUser")
  );

  if (!user || user.email !== email || password !== "123456") {
    const error = new Error("Invalid credentials");

    error.response = {
      status: 401,
      data: {
        message: "Incorrect email or password.",
      },
    };

    throw error;
  }

  const token = "mock-jwt-token";

  localStorage.setItem("token", token);

  return {
    data: {
      success: true,
      data: {
        token,
        user,
      },
    },
  };
};

export const mockCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("mockUser")
  );

  if (!token || !user) {
    const error = new Error("Unauthorized");

    error.response = {
      status: 401,
    };

    throw error;
  }

  return {
    data: {
      success: true,
      data: user,
    },
  };
};