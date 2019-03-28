import 'package:flutter/services.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:stocktakingmobile/domain/model/sign_out_result.dart';
import 'package:stocktakingmobile/domain/model/sign_in_result.dart';
import 'package:stocktakingmobile/domain/model/user.dart';

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

      var currentUser = _googleSignIn.currentUser;

      if (currentUser != null) {
        return SignInResult.Success;
      }
    } on PlatformException catch (ex) {
      if (ex.code == GoogleSignIn.kSignInCanceledError) {
        return SignInResult.Canceled;
      }
    } catch (ex) {}

    return SignInResult.Error;
  }

  Future<SignOutResult> signOut() async {
    try {
      await _googleSignIn.signOut();

      if (_googleSignIn.currentUser == null) {
        return SignOutResult.Success;
      }
    } catch (ex) {}

    return SignOutResult.Error;
  }

  User getUser() {
    try {
      return User(
        name: _googleSignIn.currentUser.displayName,
        email: _googleSignIn.currentUser.email,
      );
    } catch (ex) {
      var a = 0;
    }

    return null;
  }
}
