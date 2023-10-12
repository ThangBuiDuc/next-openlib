export async function createUser(userName, email, password, organization) {
  const res = await fetch(`${process.env.CLERK_API_END_POINT}/users`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: [email],
      username: userName,
      password,
      skip_password_checks: true,
      public_metadata: {
        isAdmin: false,
        organization,
      },
    }),
  });

  return res;
}

export async function updateUser(userId, userName, password) {
  let payload;
  if (password) {
    payload = {
      username: userName,
      password,
      skip_password_checks: true,
      sign_out_of_other_sessions: true,
    };
  } else {
    payload = { username: userName };
  }
  const res = await fetch(
    `${process.env.CLERK_API_END_POINT}/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return res;
}

export async function deleteUser(userId) {
  const res = await fetch(
    `${process.env.CLERK_API_END_POINT}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res;
}

export async function getListUser() {
  const res = await fetch(`${process.env.CLERK_API_END_POINT}/users?limit=50`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res;
}
