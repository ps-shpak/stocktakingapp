import 'package:google_sign_in/google_sign_in.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service.dart';

class AuthServiceImpl implements AuthPageService {
  GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: <String>[
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  @override
  Future<bool> isUserAuthenticated() async {
    return _googleSignIn.currentUser != null;
  }

  @override
  Future<bool> signIn() async {
    await _googleSignIn.signIn();
    return _googleSignIn.currentUser != null;
  }
}
