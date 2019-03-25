import 'package:google_sign_in/google_sign_in.dart';
import 'package:stocktakingmobile/domain/model/SignOutResult.dart';
import 'package:stocktakingmobile/domain/model/sign_in_result.dart';

class AuthenticationManager {
  GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: <String>[
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  Future<bool> isUserSignedIn() async {
    try {
      return await _googleSignIn.isSignedIn();
    } catch (ex) {
      return false;
    }
  }

  Future<SignInResult> signIn() async {
    try {
      await _googleSignIn.signIn();

      if (_googleSignIn.currentUser != null) {
        return SignInResult.Success;
      }
    } catch (ex) {}

    return SignInResult.Error;
  }

  Future<SignOutResult> signOut() async {
    try {
      await _googleSignIn.signOut();

      if (_googleSignIn.currentUser != null) {
        return SignOutResult.Success;
      }
    } catch (ex) {}

    return SignOutResult.Error;
  }
}
