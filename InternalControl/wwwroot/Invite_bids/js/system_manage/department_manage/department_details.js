$(function () {
    window.vmDetails =null ;

    avalon.ready(function () {
        window.vmDetails = avalon.define({
            $id: 'details',
            model: vm.myDetails,
            onLoad: function () {
                for(var i in vmDetails.model){
                    if (vmDetails.model[i] == null || vmDetails.model[i] == 'undefined') {
                        vmDetails.model[i] = '';
                    }
                }
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        vmDetails.onLoad();
        avalon.scan(document.body);
    });
});