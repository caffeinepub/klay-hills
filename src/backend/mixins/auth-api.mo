import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (credentials : AuthTypes.AdminCredentials) {
  public func verifyAdmin(username : Text, password : Text) : async Bool {
    AuthLib.verifyAdmin(credentials, username, password);
  };

  public func updateAdminCredentials(currentPassword : Text, newUsername : Text, newPassword : Text) : async Bool {
    AuthLib.updateAdminCredentials(credentials, currentPassword, newUsername, newPassword);
  };
};
