import 'package:shared_preferences/shared_preferences.dart';

class StorageManager {
  final _serverUrlKey = "server_url";

  Future<String> getServerUrl() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_serverUrlKey);
  }

  saveServerUrl(String url) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_serverUrlKey, url);
  }
}
