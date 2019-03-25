import 'package:stocktakingmobile/domain/model/SignOutResult.dart';
import 'package:stocktakingmobile/domain/model/sign_in_result.dart';

abstract class AuthPageService {
  Future<bool> isUserSignedIn();

  Future<SignInResult> signIn();
  Future<SignOutResult> signOut();
}
