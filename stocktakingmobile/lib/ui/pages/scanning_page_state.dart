import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';

class ScanningPageState extends State<ScanningPage> {
  String _result = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ConstrainedBox(
        constraints: const BoxConstraints.expand(),
        child: _buildPickerBody(),
      ),
    );
  }

  Widget _buildPickerBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: <Widget>[
        Text(_result),
        RaisedButton(
          child: const Text('SCAN'),
          onPressed: _startScan,
        )
      ],
    );
  }

  Future _startScan() async {
    try {
      _result = await BarcodeScanner.scan();
      setState(() {});
    } on PlatformException catch (ex) {
      if (ex.code == BarcodeScanner.CameraAccessDenied) {
        setState(() {
          _result = "Camera permission was denied";
        });
      } else {
        setState(() {
          _result = "Unknown Error $ex";
        });
      }
    } on FormatException {
      setState(() {
        _result = "You pressed the back button before scanning anything";
      });
    } catch (ex) {
      setState(() {
        _result = "Unknown Error $ex";
      });
    }
  }
}
