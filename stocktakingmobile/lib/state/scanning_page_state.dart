import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';

class ScanningPageState extends State<ScanningPage> {
  ScanningPageState(
      {navigator: ScanningPageNavigator, service: ScanningPageService})
      : _navigator = navigator,
        _service = service,
        super();

  final ScanningPageService _service;
  final ScanningPageNavigator _navigator;

  String _result = "";
  bool _isScanning = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Stack(
          children: <Widget>[
            _buildPickerBody(),
            _buildAppBar(context),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 40.0, right: 14.0),
      child: Align(
        alignment: Alignment.topRight,
        child: IconButton(
          icon: Icon(
            Icons.settings,
            color: Colors.black54,
          ),
          onPressed: () {
            _navigator.openSettings(context);
          },
        ),
      ),
    );
  }

  Widget _buildPickerBody() {
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(_result),
          RaisedButton(
            padding: EdgeInsets.only(top: 10, bottom: 10),
            color: Colors.redAccent,
            shape: CircleBorder(),
            child: Text('Click to scan'),
            onPressed: _startScan,
          ),
        ],
      ),
    );
  }

  Future _startScan() async {
    try {
      if (_isScanning) {
        return;
      }

      _isScanning = true;
      setState(() {});
      _result = await _service.scanCode();
      _isScanning = false;
      setState(() {});
    } on PlatformException catch (ex) {
      if (ex.code == BarcodeScanner.CameraAccessDenied) {
        _result = "Camera permission was denied";
        setState(() {});
      } else {
        _result = "Unknown Error $ex";
        setState(() {});
      }
    } on FormatException {
      _result = "You pressed the back button before scanning anything";
      setState(() {});
    } catch (ex) {
      _result = "Unknown Error $ex";
      setState(() {});
    }
  }
}
