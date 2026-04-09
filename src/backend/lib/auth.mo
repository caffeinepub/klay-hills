import AuthTypes "../types/auth";

module {
  public func verifyAdmin(
    credentials : AuthTypes.AdminCredentials,
    username : Text,
    password : Text,
  ) : Bool {
    credentials.username == username and credentials.passwordHash == password;
  };

  public func updateAdminCredentials(
    credentials : AuthTypes.AdminCredentials,
    currentPassword : Text,
    newUsername : Text,
    newPassword : Text,
  ) : Bool {
    if (credentials.passwordHash != currentPassword) { return false };
    credentials.username := newUsername;
    credentials.passwordHash := newPassword;
    true;
  };

  public func hashPassword(password : Text) : Text {
    password;
  };
};
