import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';
import 'package:stocktakingmobile/ui/widget/picker_body.dart';

class ScanPickerBodyState extends State<ScanPickerBody> {
  ScanPickerBodyState({onStartScan: VoidCallback})
      : assert(onStartScan != null),
        _onStartScanListener = onStartScan,
        super();

  bool isScanning = false;

  final _iconClickToScan = 'assets/ic_click_to_scan.svg';
  VoidCallback _onStartScanListener;

  @override
  Widget build(BuildContext context) {
    Widget body;

    if (isScanning) {
      body = _buildWaitingAnimation();
    } else {
      body = _buildStartButton();
    }

    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: body,
    );
  }

  Widget _buildStartButton() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: SvgPicture.asset(
            _iconClickToScan,
            width: 120,
            height: 120,
          ),
        ),
        RaisedButton(
          color: Colors.orange,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(10))),
          child: Text('Сканировать'),
          onPressed: _startScan,
        )
      ],
    );
  }

  Widget _buildWaitingAnimation() {
    return Align(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          CircularProgressIndicator(),
          Padding(
            padding: EdgeInsets.only(top: 16),
            child: Text(
              'Пожалуйста, подождите...',
              style: TextStyle(),
            ),
          ),
        ],
      ),
    );
  }

  _startScan() {
    if (isScanning) {
      return;
    }

    _onStartScanListener();
  }
}
