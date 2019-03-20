abstract class AuthPageService {
  Future<bool> isUserAuthenticated();

  Future<bool> signIn();
}
