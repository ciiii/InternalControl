$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    var projectId = oa.getUrlParam('projectId');
    parent.vm.toggle = true;
    parent.vm.isFlow = true;
    parent.$('.parent-li ul').hide();
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            reqModelSeven: {
                number: '',
                LikeName: '',
                LikeItemKey: '',
                LikeItemName: '',
                LikeCompany: '',
                IsOurCompany: true,
                WhereNotInId: '',
                WhereNotInCompany: ''
            },
            myDetails: {},
            modelIndex: '',
            apply: {
                Url: '',
                FileName: '',
            },
            menu: [],
            activeText: '',
            isFirst: true,
            isEdit: false,
            purchaseMethoOne: [],
            selectModel: [],
            allName: '',
            fileArr: [],
            isGoods: true,
            newTimeToImplement: '',
            projecId: '',
            oneselfId: '',
            executionMode: [],
            agencyList: [],
            tabActive: 0,
            tabActiveNew: 1,
            ExecuteProject: {},
            ExcuteBudget: [],
            myMenu: [],
            modelSevenAllNumber: 0,
            modelSevenIsShowCon: true,
            avoidCompany: false,
            majorItems: [],
            expertList: [],
            experNumber: '',
            candidateNumber: '',
            avoidExpert: [],
            avoidExpertNames: [],
            resultIsShow: false,
            luckyIsShow: false,
            topExpertList: [],
            afterExpertList: [],
            enterpriseType: [],
            transactionAmount: 0,
            capitalSave: 0,
            modelNineType: true,
            typeOfContract: [],
            PackageOfResultNotice: [],
            modelOne: {
                Model: {
                    Id: 0,
                    SourceBudgetProjectId: 0,
                    Year: 0,
                    Name: '',
                    ProjectType: '',
                    MergeTypeWhenExecute: '',
                    RelevantDepartmentId: 0,
                    TimeToImplement: '',
                    IsCenterPurchase: true,
                    IsGovernmentPurchase: true,
                    PurchaseMethod: '',
                    PurchaserName: '',
                    PurchaserAddress: '',
                    LinkmanName: '',
                    LinkmanPhone: '',
                    CeilingPrice: 0,
                    InspectionMethods: '',
                    ContractTerms: '',
                    CreatorId: 0,
                    CreateDatetime: '',
                    TotalExecuteAmount: 0,
                    Remark: ''
                },
                List: []
            },
            modelTwo: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {}
            },
            modelThree: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            modelFour: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {}
            },
            modelFive: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {}
            },
            modelSix: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {
                    Model: {},
                    List: [],
                }
            },
            modelSeven: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {
                    Model: {},
                    List: [],
                }
            },
            modelEight: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {
                    ExecuteProjectId: 0,
                    IdListOfExecuteProjectExperts: [],
                    BackupIdListOfExecuteProjectExperts: [],
                }
            },
            modelNine: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {
                    ModelOfExecuteProjectOfResultNotice: {},
                    ListOfPackageOfResultNotice: [],
                    ListOfRejectPackageId: []
                }
            },
            modelTen: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            modelEleven: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            modelTwelve: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            modelThirteen: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            ProjectOfArgument: {},
            ProjectOfConfirm: {},
            PackageConfirmation: {},
            ProjectOfInvitation: {},
            PackageOfDrawUpContract: {},
            PackageOfContractSigning: {},
            PackageOfContractPublicity: {},
            PackageAcceptance: {},
            ExecuteProjectOfQuestion: [],
            luckyList: [
                '田**，135********',
                '李**，158********',
                '周**，189********',
                '赵**，133********',
                '贾**，159********',
                '王**，181********',
                '丁**，136********',
                '张**，139********',
                '孙**，152********',
                '马**，180********',
                '高**，130********',
                '林**，159********',
            ],
            onLoad: function () {
                vm.ExecuteProject = vm.myDetails.ExecuteProject.ExecuteProject;
                vm.ProjectOfArgument = vm.myDetails.ExecuteProject.ExecuteProjectOfArgument;
                vm.ProjectOfConfirm = vm.myDetails.ExecuteProject.ExecuteProjectOfConfirm;
                vm.ProjectOfInvitation = vm.myDetails.ExecuteProject.ExecuteProjectOfInvitation;
                vm.ExecuteProjectOfQuestion = vm.myDetails.ExecuteProject.ExecuteProjectOfQuestion;
                vm.ExcuteBudget = vm.myDetails.ExecutePackage.PackageOfExcuteBudget;
                vm.PackageConfirmation = vm.myDetails.ExecutePackage.PackageOfTechnicalConfirmation;
                vm.PackageOfDrawUpContract = vm.myDetails.ExecutePackage.PackageOfDrawUpContract;
                vm.PackageOfContractSigning = vm.myDetails.ExecutePackage.PackageOfContractSigning;
                vm.PackageOfContractPublicity = vm.myDetails.ExecutePackage.PackageOfContractPublicity;
                vm.PackageAcceptance = vm.myDetails.ExecutePackage.PackageOfAcceptanceCheckAndAcceptance;

                if (vm.ExecuteProject.ProjectType == '货物') {
                    vm.isGoods = true;
                } else {
                    vm.isGoods = false;
                }
                if (vm.ExecuteProject.State != 0 && vm.ExecuteProject.State) {
                    vm.ExcuteBudget = vm.ExcuteBudget.concat(vm.myDetails.RejectedPackage);
                    vm.PackageConfirmation = vm.PackageConfirmation.concat(vm.myDetails.RejectedPackage);
                    vm.PackageOfDrawUpContract = vm.PackageOfDrawUpContract.concat(vm.myDetails.RejectedPackage);
                    vm.PackageOfContractSigning = vm.PackageOfContractSigning.concat(vm.myDetails.RejectedPackage);
                    vm.PackageOfContractPublicity = vm.PackageOfContractPublicity.concat(vm.myDetails.RejectedPackage);
                    vm.PackageAcceptance = vm.PackageAcceptance.concat(vm.myDetails.RejectedPackage);

                }
                if (vm.activeText == '开始实施') {
                    vm.getPurchaseMethoOne();
                    vm.modelOne.Model = matchingProperty(vm.modelOne.Model, vm.ExecuteProject);
                    vm.modelOne.Model.CeilingPrice = vm.modelOne.Model.TotalExecuteAmount;
                    vm.modelOne.Model.InspectionMethods = vm.ExecuteProject.InspectionMethods;
                    vm.newTimeToImplement = vm.modelOne.Model.TimeToImplement;
                    if (vm.modelOne.Model.ContractTerms && vm.modelOne.Model.ContractTerms != '') {
                        vm.fileArr = vm.modelOne.Model.ContractTerms.split(',');
                    }
                    vm.changeAllName();
                }
                if (vm.activeText == '执行方式') {
                    vm.modelTwo.StepId = vm.ExecuteProject.LastStepId;
                    vm.modelTwo.Data = {
                        Id: vm.ExecuteProject.Id,
                        ExecutionModeId: vm.ExecuteProject.ExecutionModeId,
                        AgencyId: 0,
                        CreatorId: vm.ExecuteProject.CreatorId,
                        CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                        Remark: ''
                    }

                    vm.getExecutionMode();
                    vm.getAgencyList();
                }
                if (vm.activeText == '技术确认') {
                    if (vm.isEdit) {
                        vm.modelThree.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelThree.Data = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    IsMSE: true,
                                    BiddingMethod: '总价招标',
                                    IsCanOperate: vm.ExcuteBudget[i].IsCanOperate,
                                    IsAcceptCombo: true,
                                    IsTakeBidBond: true,
                                    IsCenterPurchase: vm.ExcuteBudget[i].IsCenterPurchase,
                                    BidBond: 0,
                                    IsTakePerformanceBond: true,
                                    PerformanceBond: 0,
                                    LinkmanName: '',
                                    LinkmanPhone: '',
                                    ProjectType: vm.ExecuteProject.ProjectType,
                                    BudgetTypeName: vm.ExcuteBudget[i].BudgetTypeName,
                                    ExecuteUnitPrice: vm.ExcuteBudget[i].ExecuteUnitPrice,
                                    SerialNumber: vm.ExcuteBudget[i].SerialNumber,
                                    IsImported: vm.ExcuteBudget[i].IsImported,
                                    TermOfService: '合同签订生效之日起______日内',
                                    Prerequisites: '一、《中华人民共和国政府采购法》第二十二条规定：\n' +
                                    '1.具有独立承担民事责任的能力；\n' +
                                    '2.具有良好的商业信誉和健全的财务会计制度；\n' +
                                    '3.具有履行合同所必需的设备和专业技术能力；\n' +
                                    '4.有依法缴纳税收和社会保障资金的良好记录；\n' +
                                    '5.参加政府采购活动前三年内，在经营活动中没有重大违法记录；\n' +
                                    '6.法律、行政法规规定的其他条件。\n' +
                                    '二、根据本项目所拟定的特定资格条件：\n' +
                                    '1.',
                                    PaymentMethod: '合同签订生效之日起_____日内支付合同总金额的_____%，' +
                                    '项目验收合格之日起__________支付合同总金额的_____%，剩余_____%作为质量' +
                                    '保证金，验收合格之日起无约定的质量问题，_____日内无质量问题支付。',
                                    TechnicalRequirements: vm.ExcuteBudget[i].ExecuteTechnicalRequirements,
                                    Attachment: vm.ExcuteBudget[i].Attachment,
                                    GradingStandard: '',
                                    Remark: ''
                                }
                                var Project = vm.getConfirmationPackage(data.Id);
                                if (vm.PackageConfirmation && vm.PackageConfirmation.length != 0) {
                                    if (Project) {
                                        matchingProperty(data, Project);
                                    }
                                }
                                vm.modelThree.Data.push(data);
                            }
                        }
                    }
                }
                if (vm.activeText == '项目论证') {
                    if (vm.isEdit) {
                        vm.modelFour.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelFour.Data = {};
                        vm.modelFour.Data = {
                            Id: vm.ExecuteProject.Id,
                            IsNeedArgumentFile: true,
                            ArgumentFile: '',
                            ArgumentDatetime: '',
                            IsNeedAnnouncementArgument: true,
                            AnnouncementArgumentUrl: '',
                            AnnouncementArgumentScreenshots: '',
                            AnnouncementArgumentSiteName: '',
                            AnnouncementArgumentDatetime: '',
                            IsNeedArgumentFileByImported: false,
                            ArgumentFileByImported: '',
                            ApprovalFileByImported: '',
                            ArgumentByImportedDatetime: '',
                            IsNeedAnnouncementByImported: false,
                            AnnouncementByImportedUrl: '',
                            AnnouncementByImportedScreenshots: '',
                            AnnouncementByImportedSiteName: '',
                            AnnouncementByImportedDatetime: '',
                            CreatorId: vm.ExecuteProject.CreatorId,
                            CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                            Remark: ''
                        }
                    }
                }
                if (vm.activeText == '采购确认') {
                    if (vm.isEdit) {
                        vm.modelFive.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelFive.Data = {};
                        vm.modelFive.Data = {
                            Id: vm.ExecuteProject.Id,
                            AgencyFee: '',
                            AgencyContract: '',
                            ProcurementDocuments: '',
                            ConfirmationLetter: '',
                            PlanBidOpeningTime: '',
                            OpeningPlace: '',
                            CreatorId: vm.ExecuteProject.CreatorId,
                            CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                            Remark: ''
                        }
                    }
                }
                if (vm.activeText == '采购邀请') {
                    if (vm.isEdit) {
                        vm.modelSix.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelSix.Data.Model = {
                            Id: vm.ExecuteProject.Id,
                            SupplierInvitationMethod: '发布公告',
                            PurchaseAnnouncementUrl: '',
                            PurchaseAnnouncementScreenshot: '',
                            PurchaseAnnouncementWebsiteName: '',
                            TenderOfferDatetime: '',
                            DeadlineOfBidBond: '',
                            OpeningBIdTime: '',
                            CreatorId: vm.ExecuteProject.CreatorId,
                            CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                            Remark: ''
                        }
                        vm.modelSix.Data.List = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    ExtractSupplierLlist: '',
                                    WrittenRecommendationLetter: '',
                                    RandomlyExtractRecordFiles: '',
                                    ExtractSupplierLibraryNname: '',
                                    Remark: ''
                                }
                                vm.modelSix.Data.List.push(data);
                            }
                        }
                    }
                }
                if (vm.activeText == '开标评标') {
                    var Project = vm.myDetails.ExecuteProject.ExecuteProjectOfBidEvaluation;
                    var Package = vm.myDetails.ExecutePackage.PackageOfBidEvaluation;
                    if (vm.isEdit) {
                        vm.modelSeven.StepId = vm.ExecuteProject.LastStepId;
                        if (Project && Project != []) {
                            vm.modelSeven.Data.Model = {
                                Id: vm.ExecuteProject.Id,
                                BidOpeningInvitation: Project.BidOpeningInvitation,
                                IntroductionLetter: Project.IntroductionLetter,
                                PowerOfAttorney: Project.PowerOfAttorney,
                                EvaluationExpertsNumber: Project.EvaluationExpertsNumber,
                                ProcurementOnBehalfOfNumber: Project.ProcurementOnBehalfOfNumber,
                                TImeOfGetExperts: Project.TImeOfGetExperts,
                                PlaceOfGetExperts: Project.PlaceOfGetExperts,
                                BidOpeningDateTime: Project.BidOpeningDateTime,
                                BidOpeningPlace: Project.BidOpeningPlace,
                                CreatorId: Project.CreatorId,
                                CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                                Remark: ''
                            }
                            vm.modelSeven.Data.List = [];
                            for (var i = 0; i < Package.length; i++) {
                                var data = {
                                    Id: Package[i].Id,
                                    IsSatisfiedBidCompanyNumber: Package[i].IsSatisfiedBidCompanyNumber,
                                    BidCompanyNumber: Package[i].BidCompanyNumber,
                                    BidCompanyWithMarginNumber: Package[i].BidCompanyWithMarginNumber,
                                    Remark: ''
                                }
                                vm.modelSeven.Data.List.push(data);
                            }
                        } else {
                            vm.modelSeven.Data.Model = {
                                Id: vm.ExecuteProject.Id,
                                BidOpeningInvitation: '',
                                IntroductionLetter: '',
                                PowerOfAttorney: '',
                                EvaluationExpertsNumber: 3,
                                ProcurementOnBehalfOfNumber: 0,
                                TImeOfGetExperts: '',
                                PlaceOfGetExperts: '',
                                BidOpeningDateTime: '',
                                BidOpeningPlace: '',
                                CreatorId: vm.ExecuteProject.CreatorId,
                                CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                                Remark: ''
                            }
                            vm.modelSeven.Data.List = [];
                            if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                                for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                    var data = {
                                        Id: vm.ExcuteBudget[i].Id,
                                        IsSatisfiedBidCompanyNumber: true,
                                        BidCompanyNumber: 0,
                                        BidCompanyWithMarginNumber: 0,
                                        Remark: ''
                                    }
                                    vm.modelSeven.Data.List.push(data);
                                }
                            }
                        }
                        vm.modelSevenAllNumber = vm.modelSeven.Data.Model.ProcurementOnBehalfOfNumber + vm.modelSeven.Data.Model.EvaluationExpertsNumber;
                    }
                }
                if (vm.activeText == '专家抽取') {
                    if (vm.isEdit) {
                        vm.modelEight.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelEight.Data.ExecuteProjectId = vm.ExecuteProject.Id;
                    }
                }
                if (vm.activeText == '结果信息') {
                    if (vm.ExecuteProject.ExecutionModeId > 1 && vm.ExecuteProject.ExecutionModeId < 5) {
                        vm.modelNineType = true;
                    } else {
                        vm.modelNineType = false;
                    }
                    if (vm.isEdit) {
                        vm.getEnterpriseType();
                        vm.modelNine.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice = {
                            Id: vm.ExecuteProject.Id,
                            BidEvaluationReport: '',
                            Confirmationletter: '',
                            ResultBulletin: '',
                            PublicityWebsiteName: '',
                            ResultAnnouncementScreenshot: '',
                            ProcurementTeam: '',
                            Inspectors: '',
                            ProcurementProcessDocument: '',
                            CreatorId: vm.ExecuteProject.CreatorId,
                            CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                            Remark: ''
                        }
                        vm.modelNine.Data.ListOfPackageOfResultNotice = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    WinningBidder: '',
                                    state: true,
                                    TypeOfEnterprise: '大型企业',
                                    BudgetAmount: 0,
                                    WinningBidAmount: 0,
                                    SavingRate: 0,
                                    BiddingDocuments: '',
                                    BiddingDocumentsList: [],
                                    Remark: ''
                                }
                                vm.modelNine.Data.ListOfPackageOfResultNotice.push(data);
                            }
                        }
                    } else {
                        vm.PackageOfResultNotice = [];
                        vm.transactionAmount = 0;
                        for (var i = 0; i < vm.myDetails.ExecutePackage.PackageOfResultNotice.length; i++) {
                            var item = vm.getExecutePackage(vm.myDetails.ExecutePackage.PackageOfResultNotice[i].Id);
                            if (vm.ExecuteProject.IsCenterPurchase) {
                                vm.myDetails.ExecutePackage.PackageOfResultNotice[i].ItemName = item.ItemName;
                            } else {
                                vm.myDetails.ExecutePackage.PackageOfResultNotice[i].ItemName = item.PackageName;
                            }
                            vm.myDetails.ExecutePackage.PackageOfResultNotice[i].SerialNumber = item.SerialNumber;
                            vm.transactionAmount += parseInt(vm.myDetails.ExecutePackage.PackageOfResultNotice[i].WinningBidAmount);
                            vm.PackageOfResultNotice.push(vm.myDetails.ExecutePackage.PackageOfResultNotice[i]);
                        }
                        vm.capitalSave = 100 - (Math.round(parseInt(vm.transactionAmount) / parseInt(vm.ExecuteProject.TotalExecuteAmount) * 100));
                        debugger;
                    }
                }
                if (vm.activeText == '拟定合同') {
                    if (vm.isEdit) {
                        vm.getTypeOfContract();
                        vm.modelTen.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelTen.Data = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    IsCanOperate: vm.ExcuteBudget[i].IsCanOperate,
                                    TypeOfContract: '',
                                    LawyersOpinionSheet: '',
                                    SchoolCountersignedRecordForm: '',
                                    ContractApproval: ''
                                }
                                vm.modelTen.Data.push(data);
                            }
                        }
                    }
                }
                if (vm.activeText == '合同签订') {
                    if (vm.isEdit) {
                        vm.modelEleven.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelEleven.Data = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    IsCanOperate: vm.ExcuteBudget[i].IsCanOperate,
                                    ContractSigningTime: '',
                                    PurchaseContractAnnex: '',
                                    PerformanceAcceptanceDays: '',
                                    AcceptanceTime: '',
                                    CalculationType: '自然天'
                                }
                                vm.modelEleven.Data.push(data);
                            }
                        }
                    }
                }
                if (vm.activeText == '合同公示') {
                    if (vm.isEdit) {
                        vm.modelTwelve.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelTwelve.Data = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    IsCanOperate: vm.ExcuteBudget[i].IsCanOperate,
                                    ContractPublicAddress: '',
                                    ContractPublicityWebsite: '',
                                    ContractOpeningTime: '',
                                    ContractPublicScreeningScreenshot: ''
                                }
                                vm.modelTwelve.Data.push(data);
                            }
                        }
                    }
                }
                if (vm.activeText == '履约验收') {
                    if (vm.isEdit) {
                        vm.modelThirteen.StepId = vm.ExecuteProject.LastStepId;
                        vm.modelThirteen.Data = [];
                        if (vm.ExcuteBudget && vm.ExcuteBudget.length > 0) {
                            for (var i = 0; i < vm.ExcuteBudget.length; i++) {
                                var ItemName;
                                if (vm.ExecuteProject.IsCenterPurchase) {
                                    ItemName = vm.ExcuteBudget[i].ItemName;
                                } else {
                                    ItemName = vm.ExcuteBudget[i].PackageName;
                                }
                                var item = vm.getPackage(vm.ExcuteBudget[i].Id, vm.PackageOfContractSigning);
                                var data = {
                                    Id: vm.ExcuteBudget[i].Id,
                                    ItemName: ItemName,
                                    IsCanOperate: vm.ExcuteBudget[i].IsCanOperate,
                                    PerformanceBeginPeriod: '',
                                    PerformanceEndPeriod:'',
                                    ContractSigningTime:item.ContractSigningTime,
                                    AcceptanceTime: '',
                                    PerformanceAcceptanceInformation: '',
                                    PerformanceAcceptanceAnnex: ''
                                }
                                var timestamp = new Date(item.ContractSigningTime).getTime() + (item.PerformanceAcceptanceDays * 24 * 60 * 60 * 1000);
                                data.AcceptanceTime = getStrTime(timestamp);
                                vm.modelThirteen.Data.push(data);
                            }
                        }
                    }
                }
                $('.datetimepicker.datetimepicker-dropdown-bottom-right').remove();
                vm.getTime();
            },
            getRefresh: function () {
                window.location.reload();
            },
            getWidth: function () {
                var width = $(window).width();
                $('.main').css('width', width - 240);
            },
            getTime: function () {
                //选择到某一天
                $('.form-time').datetimepicker({
                    format: 'yyyy-mm-dd',
                    minView: "month",
                    todayBtn: 1,
                    autoclose: 1,
                    language: 'zh-CN'
                });
                //选择到某一天 上午/下午
                $('.form-hour').datetimepicker({
                    format: 'yyyy-mm-dd hh:00:00',
                    showMeridian: true,
                    autoclose: true,
                    minView: 1,
                    todayBtn: true,
                    language: 'zh-CN'
                });
            },
            getConfirmationPackage: function (id) {
                var Package = vm.PackageConfirmation;
                for (var i = 0; i < Package.length; i++) {
                    var item = Package[i]
                    if (item.Id == id) {
                        return item
                        break
                    }
                }
            },
            getExecutePackage: function (id) {
                var Package = vm.ExcuteBudget;
                for (var i = 0; i < Package.length; i++) {
                    var item = Package[i]
                    if (item.Id == id) {
                        return item
                        break
                    }
                }
            },
            getRejectedPackage: function (id) {
                var bag = vm.myDetails.RejectedPackage;
                for (var i = 0; i < bag.length; i++) {
                    var item = bag[i]
                    if (item.Id == id) {
                        return item
                        break
                    }
                }
            },
            getPackage: function (id, package) {
                for (var i = 0; i < package.length; i++) {
                    var item = package[i]
                    if (item.Id == id) {
                        return item
                        break
                    }
                }
            },
            getExecuteProjectDetail: function () {
                ProjectExecute.getExecuteProjectDetail('get', projectId, function getExecuteProjectDetailListener(success, obj, strErro) {
                    if (success) {
                        for (var i = 0; i < obj.ExecutePackage.PackageOfExcuteBudget.length; i++) {
                            obj.ExecutePackage.PackageOfExcuteBudget[i].ProjectName = obj.ExecuteProject.ExecuteProject.Name;
                        }
                        vm.myDetails = obj;
                        vm.myMenu = [];
                        vm.myMenu = obj.Menu;
                        vm.onLoad();
                    } else {
                        console.info('获取执行项目所有的信息失败！');
                        console.info(strErro);
                    }
                });
            },
            getPurchaseMethoOne: function () {
                Dictionary.getCategoryDictionary('get', '采购方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.purchaseMethoOne = obj;
                    } else {
                        console.info('获取计划采购方式失败！');
                        console.info(strErro);
                    }
                })
            },
            getExecutionMode: function () {
                Set.getExecutionMode('get', function getExecutionModeListener(success, obj, strErro) {
                    if (success) {
                        if (vm.myDetails.ExecuteProject.ExecuteProject.TotalExecuteAmount >= 50000) {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '自主采购') {
                                    obj.splice(i, 1);
                                }
                            }
                        }
                        if (!vm.myDetails.ExecuteProject.ExecuteProject.IsGovernmentPurchase) {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '政府采购中心') {
                                    obj.splice(i, 1);
                                }
                                if (obj[i].Name == '网上竞价') {
                                    obj.splice(i, 1);
                                }
                                if (obj[i].Name == '商城直购') {
                                    obj.splice(i, 1);
                                }
                            }
                        } else {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '自主采购') {
                                    obj.splice(i, 1);
                                }
                            }
                        }
                        vm.executionMode = obj;
                    } else {
                        console.info('获取执行方式失败！');
                        $.oaNotify.error(strErro);
                    }
                });
            },
            getAgencyList: function () {
                Set.getAgencyList('get', function getAgencyListListener(success, obj, strErro) {
                    if (success) {
                        vm.agencyList = obj;
                    } else {
                        console.info('获取代理机构失败！');
                        $.oaNotify.error(strErro);
                    }
                });
            },
            changeAgencyId: function (e) {
                vm.modelTwo.Data.AgencyId = parseInt(e.target.value);
            },
            getActive: function (el, index) {
                if (vm.activeText == el.StepTemplateName) {
                    if (el.ISCurrentStepTemplate) {
                        if (el.IsCanOperate) {
                            vm.isEdit = true;
                        } else {
                            vm.isEdit = false;
                        }
                    } else {
                        vm.isEdit = false;
                    }
                    return 'state-active';
                } else {
                    if (vm.isFirst) {
                        if (el.ISCurrentStepTemplate) {
                            if (el.IsCanOperate) {
                                vm.isEdit = true;
                                vm.activeText = el.StepTemplateName;
                                vm.isFirst = false;
                                return 'state-active';
                            } else {
                                vm.activeText = '开始实施';
                                vm.isEdit = false;
                                vm.isFirst = false;
                            }
                        }
                        if (vm.ExecuteProject.State != 0 && vm.ExecuteProject.State) {
                            vm.activeText = '开始实施';
                            vm.isEdit = false;
                            vm.isFirst = false;
                            return 'state-active';
                        }
                    }
                }
            },
            getClass: function (el) {
                if (el.ISCurrentStepTemplate) {
                    return 'state-current'
                } else {
                    if (el.IsPassed) {
                        return 'state-passed'
                    } else {
                        return 'state-not-started'
                    }
                }
            },
            clickLi: function (index, el) {
                vm.activeText = el.StepTemplateName;
                if (el.ISCurrentStepTemplate) {
                    if (el.IsCanOperate) {
                        vm.isEdit = true;
                    } else {
                        vm.activeText == '开始实施'
                        vm.isEdit = false;
                    }
                }
                if (el.IsPassed && !el.ISCurrentStepTemplate) {
                    vm.isEdit = false;
                }

                if (vm.activeText == '开始实施') {
                    vm.changeAllName();
                }
                vm.getExecuteProjectDetail();

            },
            getTabClass: function (title) {
                if (vm.activeText == title) {
                    return 'active';
                }
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vm.myDetails.ExecutePackage.PackageOfExcuteBudget.length; i++) {
                    var name = vm.myDetails.ExecutePackage.PackageOfExcuteBudget[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                vm.allName = names.join();
            },
            changeCeilingPrice: function () {
                if (vm.modelOne.Model.CeilingPrice > vm.modelOne.Model.TotalExecuteAmount) {
                    $.oaNotify.error('【最高限价】只能小于等于【预算金额】！');
                    vm.modelOne.Model.CeilingPrice = vm.modelOne.Model.TotalExecuteAmount;
                }
            },
            getClassMethod: function (text) {
                if (!vm.modelOne.Model.InspectionMethods || vm.modelOne.Model.InspectionMethods == '') {
                    vm.modelOne.Model.InspectionMethods = '综合评分';
                }
                if (vm.modelOne.Model.InspectionMethods == text) {
                    return 'active'
                }
            },
            clickMethod: function (e) {
                vm.modelOne.Model.InspectionMethods = e.target.innerText;
            },
            changePurchaseMethoOne: function (e) {
                vm.modelOne.Model.PurchaseMethod = e.target.value;
            },
            uploadClause: function (e, item) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        item.push(data);
                        $.oaNotify.ok(' 上传成功!');
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            changeTime: function () {
                var isTime = vm.compareTime(vm.modelOne.Model.TimeToImplement, vm.newTimeToImplement);
                if (!isTime) {
                    $.oaNotify.error('【实施截止时间】只能在' + vm.modelOne.Model.TimeToImplement + '以内！');
                    vm.newTimeToImplement = vm.modelOne.Model.TimeToImplement;
                    return;
                }
            },
            compareTime: function (oldTime, newTime) {
                oldTime = new Date(oldTime).getTime();
                newTime = new Date(newTime).getTime();
                if (newTime > oldTime) {
                    return false;
                } else {
                    return true;
                }
            },
            postData: function () {
                vm.modelOne.Model.TimeToImplement = vm.newTimeToImplement;
                if (vm.fileArr.length != 0) {
                    vm.modelOne.Model.ContractTerms = vm.fileArr.join();
                }
                vm.modelOne.List = [];
                if (vm.selectModel.length != 0) {
                    for (var i = 0; i < vm.selectModel.length; i++) {
                        var id = vm.selectModel[i].ExecuteProject.Id;
                        vm.modelOne.List.push(id);
                    }
                }
                if (!vm.modelOne.Model.PurchaseMethod || vm.modelOne.Model.PurchaseMethod == '') {
                    $.oaNotify.error('请选择采购方式！');
                    return;
                }
                vm.modelOne.Model.CreateDatetime = formatDate(new Date(), 'YY-MM-DD hh:mm:ss');
                vm.beginExecuteProject(vm.modelOne.$model);
            },
            beginExecuteProject: function (data) {
                ProjectExecute.beginExecuteProject('post', data, function beginExecuteProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            countCollectionPrice: function () {
                vm.modelOne.Model.TotalExecuteAmount = 0;
                vm.modelOne.Model.TotalExecuteAmount = vm.selectModel.reduce(function (total, item) {
                    if (item.ExecuteUnitPrice == '') {
                        item.ExecuteUnitPrice = 0;
                    }
                    return total + parseInt(item.ExecuteNumber) * parseInt(item.ExecuteUnitPrice);
                }, 0)
            },
            clickAddMerge: function () {
                vm.oneselfId = vm.modelOne.Model.Id;
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
            },
            clickSubmitOne: function () {
                vm.postData();
            },
            getObjClass: function (text) {
                if (vm.model.Data.Model.ProjectType == text) {
                    return 'active';
                }
            },
            getClassExecutionMode: function (id) {
                if (vm.modelTwo.Data.ExecutionModeId == id) {
                    return 'active'
                }
            },
            changeExecutionMode: function (e) {
                vm.modelTwo.Data.ExecutionModeId = parseInt(e.target.dataset.id);
            },
            clickSubmitTwo: function () {
                if (vm.modelTwo.Data.ExecutionModeId) {
                    if (vm.modelTwo.Data.ExecutionModeId == 4) {
                        if (vm.modelTwo.Data.AgencyId == '' || vm.modelTwo.Data.AgencyId == 0) {
                            $.oaNotify.error('请选择代理机构！');
                        } else {
                            vm.passExecuteProjectOfGetRunMode(vm.modelTwo.$model);
                        }
                    } else {
                        vm.passExecuteProjectOfGetRunMode(vm.modelTwo.$model);
                    }
                } else {
                    $.oaNotify.error('请选择执行方式！');
                }

            },
            passExecuteProjectOfGetRunMode: function (data) {
                ProjectExecute.passExecuteProjectOfGetRunMode('post', data, function passExecuteProjectOfGetRunModeListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            tabClass: function (index) {
                if (vm.tabActive == index) {
                    return 'active';
                }
            },
            tabClassNew: function (index) {
                if (vm.tabActiveNew == index) {
                    return 'active';
                }
            },
            clickTabClass: function (index) {
                vm.tabActive = index;
            },
            getClassInviteTenders: function (text, selectText) {
                if (selectText == text) {
                    return 'active'
                }
            },
            clickInviteTenders: function (text, el) {
                el.BiddingMethod = text;
            },
            clickAcceptCombo: function (text, el) {
                el.IsAcceptCombo = text;
            },
            clickTakeBidBond: function (text, el) {
                el.IsTakeBidBond = text;
            },
            clickTakePerformanceBond: function (text, el) {
                el.IsTakePerformanceBond = text;
            },
            changeBidBond: function (el) {
                if (el.BidBond > el.ExecuteUnitPrice * 0.02) {
                    $.oaNotify.error('【投标保证金金额】不能高于【预算金额】的2%！');
                }
            },
            changePerformanceBond: function (el) {
                if (el.PerformanceBond > 10) {
                    $.oaNotify.error('【履约保证金金额】不能高于10%！');
                    el.PerformanceBond = 10;
                }
            },
            uploadAttachment: function (e, item) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        item.Attachment = data;
                        $.oaNotify.ok(' 上传成功!');
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadGradingStandard: function (e, item) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        item.GradingStandard = data;
                        $.oaNotify.ok(' 上传成功!');
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitThree: function () {
                var isCollection = true;
                console.info(vm.modelThree)
                if (vm.ExecuteProject.IsCenterPurchase && vm.ExecuteProject.ProjectType == '货物') {
                    isCollection = true;
                } else {
                    isCollection = false;
                }
                for (var i = 0; i < vm.modelThree.Data.length; i++) {
                    var data = vm.modelThree.Data;
                    var text = '【第' + (i + 1) + '包】'
                    if (data[i].IsTakeBidBond) {
                        if (data[i].BidBond > data[i].ExecuteUnitPrice * 0.02) {
                            $.oaNotify.error(text + '【投标保证金金额】不能高于【预算金额】的2%！');
                            return
                            break;
                        }
                    } else {
                        data[i].BidBond = 0;
                    }
                    if (data[i].IsTakePerformanceBond) {
                        if (data[i].PerformanceBond > 10) {
                            $.oaNotify.error(text + '【履约保证金金额】不能高于10%！');
                            data[i].PerformanceBond = 10;
                            return
                            break;
                        }
                    } else {
                        data[i].PerformanceBond = 0;
                    }

                    if (data[i].LinkmanName == '') {
                        $.oaNotify.error(text + '【联系人】不能为空！');
                        return
                        break;
                    }
                    if (data[i].LinkmanPhone == '') {
                        $.oaNotify.error(text + '【联系方式】不能为空！');
                        return
                        break;
                    }
                    if (data[i].PaymentMethod == '') {
                        $.oaNotify.error(text + '【付款方式】不能为空！');
                        return
                        break;
                    }
                    if (data[i].Prerequisites == '') {
                        $.oaNotify.error(text + '【资格条件】不能为空！');
                        return
                        break;
                    }
                    if (isCollection) {
                        if (data[i].TechnicalRequirements == '' || !data[i].TechnicalRequirements) {
                            $.oaNotify.error(text + '【采购需求】不能为空！');
                            return
                            break;
                        }
                    } else {
                        if (data[i].Attachment == '' || !data[i].Attachment) {
                            $.oaNotify.error(text + '【采购需求】不能为空！');
                            return
                            break;
                        }
                    }
                }
                console.info(vm.modelThree)
                vm.passPackageOfTechnicalConfirmation(vm.modelThree.$model);
            },
            passPackageOfTechnicalConfirmation: function (data) {
                ProjectExecute.passPackageOfTechnicalConfirmation('post', data, function passPackageOfTechnicalConfirmationListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickDemonstration: function (value) {
                vm.modelFour.Data.IsNeedArgumentFile = value;
                if (value) {
                    vm.getTime();
                }
            },
            clickPublicity: function (value) {
                vm.modelFour.Data.IsNeedAnnouncementArgument = value;
                if (value) {
                    vm.getTime();
                }
            },
            clickProductDemonstration: function (value) {
                vm.modelFour.Data.IsNeedArgumentFileByImported = value;
                if (value) {
                    vm.getTime();
                }
            },
            clickProductDemonstrationPublicity: function (value) {
                vm.modelFour.Data.IsNeedAnnouncementByImported = value;
            },
            uploadArgumentFile: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFour.Data.ArgumentFile = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadAnnouncementArgumentScreenshots: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFour.Data.AnnouncementArgumentScreenshots = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadArgumentFileByImported: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFour.Data.ArgumentFileByImported = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadApprovalFileByImported: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFour.Data.ApprovalFileByImported = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadAnnouncementByImportedScreenshots: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFour.Data.AnnouncementByImportedScreenshots = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitFour: function () {
                var data = vm.modelFour.Data;
                var text;
                if (vm.ExecuteProject.PurchaseMethod == '单一来源') {
                    text = '单一来源论证';
                } else {
                    text = '需求论证';
                }
                if (data.IsNeedArgumentFile) {
                    if (!data.ArgumentFile || data.ArgumentFile == '') {
                        $.oaNotify.error('【' + text + '】请上传论证报告！');
                        return
                    }
                    if (!data.ArgumentDatetime || data.ArgumentDatetime == '') {
                        $.oaNotify.error('【' + text + '】论证时间不能为空！');
                        return
                    }
                }
                if (data.IsNeedAnnouncementArgument && data.IsNeedArgumentFile) {
                    if (!data.AnnouncementArgumentUrl || data.AnnouncementArgumentUrl == '') {
                        $.oaNotify.error('【' + text + '】论证公示不能为空！');
                        return
                    }
                    if (!data.AnnouncementArgumentSiteName || data.AnnouncementArgumentSiteName == '') {
                        $.oaNotify.error('【' + text + '】公示网站名称不能为空！');
                        return
                    }
                    if (!data.AnnouncementArgumentScreenshots || data.AnnouncementArgumentScreenshots == '') {
                        $.oaNotify.error('【' + text + '】请上传公示截图！');
                        return
                    }
                }
                if (data.IsNeedArgumentFileByImported && data.IsNeedArgumentFile) {
                    if (!data.ArgumentFileByImported || data.ArgumentFileByImported == '') {
                        $.oaNotify.error('请上传进口产品论证报告！');
                        return
                    }
                    if (!data.ApprovalFileByImported || data.ApprovalFileByImported == '') {
                        $.oaNotify.error('请上传进口产品审批文件！');
                        return
                    }
                    if (!data.ArgumentByImportedDatetime || data.ArgumentByImportedDatetime == '') {
                        $.oaNotify.error('进口产品论证时间不能为空！');
                        return
                    }
                }
                if (data.IsNeedArgumentFileByImported && data.IsNeedAnnouncementByImported && data.IsNeedArgumentFile) {
                    if (!data.AnnouncementByImportedUrl || data.AnnouncementByImportedUrl == '') {
                        $.oaNotify.error('进口产品论证论证公示不能为空！');
                        return
                    }
                    if (!data.AnnouncementByImportedSiteName || data.AnnouncementByImportedSiteName == '') {
                        $.oaNotify.error('进口产品论证论证公示网站名称不能为空！');
                        return
                    }
                    if (!data.AnnouncementByImportedDatetime || data.AnnouncementByImportedDatetime == '') {
                        $.oaNotify.error('进口产品论证论证公示时间不能为空！');
                        return
                    }
                    if (!data.AnnouncementByImportedScreenshots || data.AnnouncementByImportedScreenshots == '') {
                        $.oaNotify.error('请上传进口产品论证公示截图！');
                        return
                    }
                }
                console.info(vm.modelFour)
                vm.passExecuteProjectOfArgument(vm.modelFour.$model);
            },
            passExecuteProjectOfArgument: function (data) {
                ProjectExecute.passExecuteProjectOfArgument('post', data, function passExecuteProjectOfArgumentListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            uploadAgencyContract: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFive.Data.AgencyContract = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadProcurementDocuments: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFive.Data.ProcurementDocuments = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadConfirmationLetter: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelFive.Data.ConfirmationLetter = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitFive: function () {
                var data = vm.modelFive.Data;
                if (data.AgencyFee == '' || data.AgencyFee == 0) {
                    $.oaNotify.error('请填写【代理服务费】！');
                    return
                }
                if (!data.AgencyContract || data.AgencyContract == '') {
                    $.oaNotify.error('请上传【代理合同】！');
                    return
                }
                if (!data.ProcurementDocuments || data.ProcurementDocuments == '') {
                    $.oaNotify.error('请上传【招标文件】！');
                    return
                }
                if (!data.ConfirmationLetter || data.ConfirmationLetter == '') {
                    $.oaNotify.error('请上传【采购文件确认函】！');
                    return
                }
                if (!data.PlanBidOpeningTime || data.PlanBidOpeningTime == '') {
                    $.oaNotify.error('请选择【拟开标时间】！');
                    return
                }
                if (!data.OpeningPlace || data.OpeningPlace == '') {
                    $.oaNotify.error('请填写【开标地点】！');
                    return
                }
                vm.passExecuteProjectOfConfirm(vm.modelFive.$model);
            },
            passExecuteProjectOfConfirm: function (data) {
                ProjectExecute.passExecuteProjectOfConfirm('post', data, function passExecuteProjectOfConfirmListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickSupplierInvitationMethod: function (e) {
                var value = e.target.innerText;
                vm.modelSix.Data.Model.SupplierInvitationMethod = value;
                if (value == '发布公告') {
                    vm.getTime();
                }
            },
            uploadPurchaseAnnouncementScreenshot: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelSix.Data.Model.PurchaseAnnouncementScreenshot = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadWrittenRecommendationLetter: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.WrittenRecommendationLetter = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadRandomlyExtractRecordFiles: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.RandomlyExtractRecordFiles = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitSix: function () {
                var data = vm.modelSix.Data;
                if (!data.Model.TenderOfferDatetime || data.Model.TenderOfferDatetime == '') {
                    $.oaNotify.error('请填写【标书发售时间】！');
                    return
                }
                if (!data.Model.DeadlineOfBidBond || data.Model.DeadlineOfBidBond == '') {
                    $.oaNotify.error('请填写【投标保证金截止时间】！');
                    return
                }
                if (!data.Model.OpeningBIdTime || data.Model.OpeningBIdTime == '') {
                    $.oaNotify.error('请填写【开标时间】！');
                    return
                }
                if (data.Model.SupplierInvitationMethod == '发布公告') {
                    data.List = [];
                    if (!data.Model.PurchaseAnnouncementUrl || data.Model.PurchaseAnnouncementUrl == '') {
                        $.oaNotify.error('请填写【采购公告地址】！');
                        return
                    }
                    if (!data.Model.PurchaseAnnouncementScreenshot || data.Model.PurchaseAnnouncementScreenshot == '') {
                        $.oaNotify.error('请上传【采购公告截图】！');
                        return
                    }
                    if (!data.Model.PurchaseAnnouncementWebsiteName || data.Model.PurchaseAnnouncementWebsiteName == '') {
                        $.oaNotify.error('请填写【公示网站名称】！');
                        return
                    }
                }
                if (data.Model.SupplierInvitationMethod == '书面推荐') {
                    for (var i = 0; i < data.List.length; i++) {
                        if (!data.List[i].ExtractSupplierLlist || data.List[i].ExtractSupplierLlist == '') {
                            $.oaNotify.error('请填写【抽取供应商名单】！');
                            return
                            break;
                        }
                        if (!data.List[i].WrittenRecommendationLetter || data.List[i].WrittenRecommendationLetter == '') {
                            $.oaNotify.error('请上传【书面推荐函】！');
                            return
                            break;
                        }
                    }
                }
                if (data.Model.SupplierInvitationMethod == '供应商库随机抽取') {
                    for (var i = 0; i < data.List.length; i++) {
                        if (!data.List[i].ExtractSupplierLlist || data.List[i].ExtractSupplierLlist == '') {
                            $.oaNotify.error('请填写【抽取供应商名单】！');
                            return
                            break;
                        }
                        if (!data.List[i].RandomlyExtractRecordFiles || data.List[i].RandomlyExtractRecordFiles == '') {
                            $.oaNotify.error('请上传【随机抽取记录文件】！');
                            return
                            break;
                        }
                        if (!data.List[i].ExtractSupplierLibraryNname || data.List[i].ExtractSupplierLibraryNname == '') {
                            $.oaNotify.error('请上传【抽取供应商库名称】！');
                            return
                            break;
                        }
                    }
                }
                console.info(vm.modelSix)
                vm.passExecuteProjectOfInvitation(vm.modelSix.$model);
            },
            passExecuteProjectOfInvitation: function (data) {
                ProjectExecute.passExecuteProjectOfInvitation('post', data, function passExecuteProjectOfInvitationListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickIsSatisfiedBidCompanyNumber: function (value, el) {
                el.IsSatisfiedBidCompanyNumber = value;
                var isShow = false;
                for (var i = 0; i < vm.modelSeven.Data.List.length; i++) {
                    var list = vm.modelSeven.Data.List;
                    if (list[i].IsSatisfiedBidCompanyNumber) {
                        isShow = true;
                    }
                }
                vm.modelSevenIsShowCon = isShow;
                vm.getTime();
            },
            changeProcurementOnBehalfOfNumber: function (e) {
                var data = vm.modelSeven.Data.Model;
                data.ProcurementOnBehalfOfNumber = e.target.value;
                vm.modelSevenAllNumber = parseInt(data.ProcurementOnBehalfOfNumber) + parseInt(data.EvaluationExpertsNumber);
                vm.changeNumber(vm.modelSevenAllNumber);

            },
            changeNumber: function () {
                var data = vm.modelSeven.Data.Model;
                if (!(data.EvaluationExpertsNumber >= data.ProcurementOnBehalfOfNumber * 2)) {
                    $.oaNotify.error(' 采购代表必须小于等于总人数的 1/3！');
                    return
                }
                if (vm.modelSevenAllNumber % 2 == 0) {
                    $.oaNotify.error(' 总数必须是奇数！');
                    return
                }
            },
            changeEvaluationExpertsNumber: function (e) {
                var data = vm.modelSeven.Data.Model;
                data.EvaluationExpertsNumber = e.target.value;
                vm.modelSevenAllNumber = parseInt(data.ProcurementOnBehalfOfNumber) + parseInt(data.EvaluationExpertsNumber);
                vm.changeNumber(vm.modelSevenAllNumber);
            },
            uploadBidOpeningInvitation: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelSeven.Data.Model.BidOpeningInvitation = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadBidIntroductionLetter: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelSeven.Data.Model.IntroductionLetter = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadPowerOfAttorney: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelSeven.Data.Model.PowerOfAttorney = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            temporarySeven: function () {
                vm.modelSeven.IsHold = true;
                vm.postDataSeven();
            },
            clickSubmitSeven: function () {
                vm.modelSeven.IsHold = false;
                vm.postDataSeven();
            },
            postDataSeven: function () {
                var data = vm.modelSeven.Data.Model;
                if (vm.modelSevenIsShowCon) {
                    vm.changeNumber();
                    if (vm.myDetails.ExecuteProject.ExecuteProjectOfGetRunMode.ExecutionModeId != 2) {
                        if (!data.BidOpeningInvitation || data.BidOpeningInvitation == '') {
                            $.oaNotify.error('请上传【开标邀请函】！');
                            return
                        }
                        if (!data.IntroductionLetter || data.IntroductionLetter == '') {
                            $.oaNotify.error('请上传【介绍信】！');
                            return
                        }
                        if (!data.PowerOfAttorney || data.PowerOfAttorney == '') {
                            $.oaNotify.error('请上传【采购人代表委托书】！');
                            return
                        }
                    }
                    if (!data.TimeOfExpertReview || data.TimeOfExpertReview == '') {
                        $.oaNotify.error('请填写【专家评审时间】！');
                        return
                    }
                    if (!data.PlaceOfExpertReview || data.PlaceOfExpertReview == '') {
                        $.oaNotify.error('请填写【专家评审地点】！');
                        return
                    }
                    if (!data.TImeOfGetExperts || data.TImeOfGetExperts == '') {
                        $.oaNotify.error('请填写【专家抽取时间】！');
                        return
                    }
                    if (!data.PlaceOfGetExperts || data.PlaceOfGetExperts == '') {
                        $.oaNotify.error('请填写【专家抽取地点】！');
                        return
                    }
                    if (!data.BidOpeningDateTime || data.BidOpeningDateTime == '') {
                        $.oaNotify.error('请填写【开标时间】！');
                        return
                    }
                    if (!data.BidOpeningPlace || data.BidOpeningPlace == '') {
                        $.oaNotify.error('请填写【开标地点】！');
                        return
                    }
                }
                vm.passExecuteProjectOfBidEvaluation(vm.modelSeven.$model);
            },
            passExecuteProjectOfBidEvaluation: function (data) {
                ProjectExecute.passExecuteProjectOfBidEvaluation('post', data, function passExecuteProjectOfBidEvaluationListener(success, obj, strErro) {
                    if (success) {
                        if (vm.modelSeven.IsHold) {
                            $.oaNotify.ok(' 暂存成功!');
                        } else {
                            $.oaNotify.ok(' 提交成功，进入下一步!');
                        }

                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '专业品目', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.majorItems = obj;
                    } else {
                        console.info('获取专业品目失败！');
                        console.info(strErro);
                    }
                })
            },
            startExtract: function () {
                if (vm.candidateNumber == '') {
                    vm.candidateNumber = 0;
                }
                if (vm.experNumber == '') {
                    vm.experNumber = 0;
                }
                vm.reqModelSeven.number = parseInt(vm.experNumber) + parseInt(vm.candidateNumber);
                var arr = [];
                for (var i = 0; i < vm.avoidExpert.length; i++) {
                    arr.push(vm.avoidExpert[i].Id);
                }
                vm.reqModelSeven.WhereNotInId = arr.join();
                if (vm.experNumber && vm.experNumber > 0) {
                    vm.luckyIsShow = true;
                    var timing = setInterval(function () {
                        var el = vm.luckyList[0];
                        vm.luckyList.push(el);
                        vm.luckyList.remove(el);
                    }, 100);
                    setTimeout(function () {
                        vm.getRandomExpertList(timing);
                    }, 2000);
                } else {
                    $.oaNotify.error(' 【抽取专家数量】必须大于0');
                }
            },
            getRandomExpertList: function (timing) {
                Set.getRandomExpertList('get', vm.reqModelSeven.$model, function getRandomExpertListListener(success, obj, strErro) {
                    vm.luckyIsShow = false;
                    clearInterval(timing);
                    if (success) {
                        if (obj && obj.length != 0) {
                            vm.topExpertList = obj.slice(0, vm.experNumber);
                            vm.afterExpertList = obj.slice(vm.experNumber);
                            vm.resultIsShow = true;
                        } else {
                            $.oaNotify.error(' 抽取失败：没有符合条件的专家！');
                        }

                    } else {
                        console.info('抽取专家失败！');
                        console.info(strErro);
                    }
                })
            },
            clickEmpty: function () {
                vm.avoidExpert = [];
                vm.avoidExpertNames = '';
            },
            clickIsOurCompany: function (value) {
                vm.avoidCompany = !value;
                vm.reqModelSeven.IsOurCompany = !vm.avoidCompany;
            },
            clickSubmitEight: function () {
                if (vm.topExpertList.length != vm.experNumber) {
                    $.oaNotify.error(' 【抽取专家数量】和【专家抽取结果】人数不一致！');
                    return
                }
                if (vm.afterExpertList.length != vm.candidateNumber) {
                    $.oaNotify.error(' 【备选数量】和【备选抽取结果】人数不一致！');
                    return
                }
                vm.modelEight.Data.IdListOfExecuteProjectExperts = [];
                vm.modelEight.Data.BackupIdListOfExecuteProjectExperts = [];
                for (var i = 0; i < vm.topExpertList.length; i++) {
                    vm.modelEight.Data.IdListOfExecuteProjectExperts.push(vm.topExpertList[i].Id);
                }
                for (var i = 0; i < vm.afterExpertList.length; i++) {
                    vm.modelEight.Data.BackupIdListOfExecuteProjectExperts.push(vm.afterExpertList[i].Id);
                }
                vm.passExecuteProjectExperts(vm.modelEight.$model);
            },
            passExecuteProjectExperts: function (data) {
                ProjectExecute.passExecuteProjectExperts('post', data, function passExecuteProjectExpertsListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickState: function (value, el) {
                el.state = value;
            },
            getEnterpriseType: function () {
                Dictionary.getCategoryDictionary('get', '企业类型', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.enterpriseType = obj.reverse();
                    } else {
                        console.info('获取企业类型失败！');
                        console.info(strErro);
                    }
                })
            },
            clickEnterpriseType: function (value, el) {
                el.TypeOfEnterprise = value;
            },
            uploadBidEvaluationReport: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice.BidEvaluationReport = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadConfirmationletter: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice.Confirmationletter = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadResultAnnouncementScreenshot: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice.ResultAnnouncementScreenshot = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadProcurementProcessDocument: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice.ProcurementProcessDocument = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadBiddingDocuments: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.BiddingDocumentsList.push(data);
                        el.BiddingDocuments = el.BiddingDocumentsList.join();
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            changeSavingRate: function (el) {
                el.SavingRate = 100 - (Math.round(parseInt(el.WinningBidAmount) / parseInt(el.BudgetAmount) * 100));
                vm.transactionAmount = 0;
                for (var i = 0; i < vm.modelNine.Data.ListOfPackageOfResultNotice.length; i++) {
                    vm.transactionAmount += parseInt(vm.modelNine.Data.ListOfPackageOfResultNotice[i].WinningBidAmount);
                }
                vm.capitalSave = 100 - (Math.round(parseInt(vm.transactionAmount) / parseInt(vm.ExecuteProject.TotalExecuteAmount) * 100));
            },
            clickSubmitNine: function () {
                var data = vm.modelNine.Data.ModelOfExecuteProjectOfResultNotice;
                var list = vm.modelNine.Data.ListOfPackageOfResultNotice;

                if (!data.ProcurementTeam || data.ProcurementTeam == '') {
                    if (vm.modelNineType) {
                        $.oaNotify.error(' 【评标委员会】不能为空！');
                        return
                    } else {
                        $.oaNotify.error(' 【采购小组人员】不能为空！');
                        return
                    }
                }
                if (vm.modelNineType) {
                    if (!data.BidEvaluationReport || data.BidEvaluationReport == '') {
                        $.oaNotify.error(' 请上传【评标报告】！');
                        return
                    }
                } else {
                    if (!data.Inspectors || data.Inspectors == '') {
                        $.oaNotify.error(' 【监督人员】不能为空！');
                        return
                    }
                    if (!data.ProcurementProcessDocument || data.ProcurementProcessDocument == '') {
                        $.oaNotify.error(' 请上传【采购流程文件】！');
                        return
                    }
                }
                if (vm.ExecuteProject.ExecutionModeId == 4) {
                    if (!data.ResultAnnouncementScreenshot || data.ResultAnnouncementScreenshot == '') {
                        $.oaNotify.error(' 请上传【结果确认函】！');
                        return
                    }
                }
                var arr = [];
                for (var i = 0; i < list.length; i++) {
                    if (!list[i].BiddingDocuments || list[i].BiddingDocuments == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【投标文件】！');
                        return
                        break
                    }
                    if (list[i].state) {
                        if (!list[i].WinningBidder || list[i].WinningBidder == '') {
                            $.oaNotify.error(' 第' + (i + 1) + '包，【中标/成功供应商】不能为空！');
                            return
                            break
                        }
                        if (list[i].BudgetAmount == '' || list[i].BudgetAmount == 0) {
                            $.oaNotify.error(' 第' + (i + 1) + '包，【预算金额】不能为空！');
                            return
                            break
                        }
                        if (list[i].WinningBidAmount == '' || list[i].WinningBidAmount == 0) {
                            $.oaNotify.error(' 第' + (i + 1) + '包，【中标成交金额】不能为空！');
                            return
                            break
                        }
                        if (list[i].WinningBidAmount == '' || list[i].WinningBidAmount == 0) {
                            $.oaNotify.error(' 第' + (i + 1) + '包，【中标成交金额】不能为空！');
                            return
                            break
                        }
                    } else {
                        arr.push(list[i].Id);
                    }
                }
                vm.modelNine.Data.ListOfRejectPackageId = arr;
                console.info(vm.modelNine.$model)
                vm.passExecuteProjectOfResultNotice(vm.modelNine.$model);
            },
            passExecuteProjectOfResultNotice: function (data) {
                ProjectExecute.passExecuteProjectOfResultNotice('post', data, function passExecuteProjectOfResultNoticeListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            getTypeOfContract: function () {
                Dictionary.getCategoryDictionary('get', '合同类型', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.typeOfContract = obj.reverse();
                    } else {
                        console.info('获取合同类型失败！');
                        console.info(strErro);
                    }
                })
            },
            uploadLawyersOpinionSheet: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.LawyersOpinionSheet = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadSchoolCountersignedRecordForm: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.SchoolCountersignedRecordForm = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadContractApproval: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.ContractApproval = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitTen: function () {
                var data = vm.modelTen.Data;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].TypeOfContract || data[i].TypeOfContract == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请选择【合同类型】！');
                        return
                        break
                    }
                    if (!data[i].LawyersOpinionSheet || data[i].LawyersOpinionSheet == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【律师审核意见表】！');
                        return
                        break
                    }
                    if (!data[i].SchoolCountersignedRecordForm || data[i].SchoolCountersignedRecordForm == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【校内会签记录表】！');
                        return
                        break
                    }
                    if (!data[i].ContractApproval || data[i].ContractApproval == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【合同审定稿】！');
                        return
                        break
                    }
                }
                console.info(vm.modelTen.$model)
                vm.passPackageOfDrawUpContract(vm.modelTen.$model);
            },
            passPackageOfDrawUpContract: function (data) {
                ProjectExecute.passPackageOfDrawUpContract('post', data, function passPackageOfDrawUpContractListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            uploadPurchaseContractAnnex: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.PurchaseContractAnnex = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            changeContractSigningTime: function (el) {
                var timestamp = new Date(el.ContractSigningTime).getTime() + (el.PerformanceAcceptanceDays * 24 * 60 * 60 * 1000);
                return el.AcceptanceTime = getStrTime(timestamp);

            },
            clickSubmitEleven: function () {
                var data = vm.modelEleven.Data;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].ContractSigningTime || data[i].ContractSigningTime == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，【合同签订时间】不能为空！');
                        return
                        break
                    }
                    if (!data[i].PurchaseContractAnnex || data[i].PurchaseContractAnnex == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【采购合同附件】！');
                        return
                        break
                    }
                    data[i].PerformanceAcceptanceDays = parseInt(data[i].PerformanceAcceptanceDays);
                    if (!data[i].PerformanceAcceptanceDays || data[i].PerformanceAcceptanceDays == '') {

                        $.oaNotify.error(' 第' + (i + 1) + '包，【履约验收期限】！');
                        return
                        break
                    }
                    if (!data[i].CalculationType || data[i].CalculationType == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请选择【履约验收期限计算方式】！');
                        return
                        break
                    }
                }
                vm.passPackageOfContractSigning(vm.modelEleven.$model);
            },
            passPackageOfContractSigning: function (data) {
                ProjectExecute.passPackageOfContractSigning('post', data, function passPackageOfContractSigningListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            uploadContractPublicScreeningScreenshot: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.ContractPublicScreeningScreenshot = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmitTwelve: function () {
                var data = vm.modelTwelve.Data;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].ContractPublicAddress || data[i].ContractPublicAddress == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，【合同公示地址】不能为空！');
                        return
                        break
                    }
                    if (!data[i].ContractPublicityWebsite || data[i].ContractPublicityWebsite == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请填写【合同公示网站】！');
                        return
                        break
                    }
                    if (!data[i].ContractOpeningTime || data[i].ContractOpeningTime == '') {

                        $.oaNotify.error(' 第' + (i + 1) + '包，请填写【合同公示时间】！');
                        return
                        break
                    }
                    if (!data[i].ContractPublicScreeningScreenshot || data[i].ContractPublicScreeningScreenshot == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【合同公示截图】文件！');
                        return
                        break
                    }
                }
                vm.passPackageOfContractPublicity(vm.modelTwelve.$model);
            },
            passPackageOfContractPublicity: function (data) {
                ProjectExecute.passPackageOfContractPublicity('post', data, function passPackageOfContractPublicityListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            uploadPerformanceAcceptanceAnnex: function (e, el) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        el.PerformanceAcceptanceAnnex = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            changeAcceptanceTime: function (el) {
                var timestamp = new Date(el.ContractSigningTime).getTime() + (el.PerformanceEndPeriod * 24 * 60 * 60 * 1000);
                return el.AcceptanceTime = getStrTime(timestamp);

            },
            clickSubmitThirteen: function () {
                var data = vm.modelThirteen.Data;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].AcceptanceTime || data[i].AcceptanceTime == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请填写【验收时间】！');
                        return
                        break
                    }
                    if (!data[i].PerformanceAcceptanceInformation || data[i].PerformanceAcceptanceInformation == '') {

                        $.oaNotify.error(' 第' + (i + 1) + '包，请填写【履约验收信息】！');
                        return
                        break
                    }
                    if (!data[i].PerformanceAcceptanceAnnex || data[i].PerformanceAcceptanceAnnex == '') {
                        $.oaNotify.error(' 第' + (i + 1) + '包，请上传【履约验收附件】文件！');
                        return
                        break
                    }
                }
                console.info(vm.modelThirteen.$model);
                vm.passPackageOfAcceptanceCheckAndAcceptance(vm.modelThirteen.$model);
            },
            passPackageOfAcceptanceCheckAndAcceptance: function (data) {
                ProjectExecute.passPackageOfAcceptanceCheckAndAcceptance('post', data, function passPackageOfAcceptanceCheckAndAcceptanceListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功，进入下一步!');
                        vm.isFirst = true;
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            clickBtnCancel: function () {
                parent.vm.toggle = false;
                parent.vm.isFlow = false;
                location.href = '/Invite_bids/views/project_execute/execute_list.html';
            },
        });
        /* $('.form-year').datetimepicker({
             format: 'yyyy',
             todayBtn: 1,
             autoclose: 1,
             startView: 4,
             minView: 4,
             language: 'zh-CN',
         });
         $('.form-month').datetimepicker({
             format: 'yyyy-mm',
             weekStart: 1,
             autoclose: true,
             startView: 3,
             minView: 3,
             forceParse: false,
             language: 'zh-CN',
             linkField: "mirror_field"
         });*/
        $('.page-edit-execute .left-nav').mCustomScrollbar({
            theme: 'dark-3',
        });
        $(window).resize(function () {
            vm.getWidth();
        });

        vm.getExecuteProjectDetail();
        vm.getWidth();
        avalon.scan(document.body);
    });
});