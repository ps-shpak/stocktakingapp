import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/SignOutResult.dart';
import 'package:stocktakingmobile/domain/model/sign_in_result.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service.dart';

class AuthPageServiceImpl implements AuthPageService {
  AuthPageServiceImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  final AuthenticationManager _authenticationManager;

  @override
  Future<bool> isUserSignedIn() async {
    return await _authenticationManager.isUserSignedIn();
  }

  @override
  Future<SignInResult> signIn() async {
    return await _authenticationManager.signIn();
  }

  @override
  Future<SignOutResult> signOut() async {
    return await _authenticationManager.signOut();
  }
}
