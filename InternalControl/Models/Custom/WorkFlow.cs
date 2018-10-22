using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternalControl.Models
{
    /// <summary>
    /// 完成步骤时,提交的数据
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class StepDone<T>
    {
        /// <summary>
        /// 完成哪个步骤
        /// </summary>
        public int StepId { get; set; }
        /// <summary>
        /// 完整的状态值,步骤类型状态,
        /// 2018-10-3 传入的不需要这个了,后台把不同state的接口分开来表现,这个state后台来填写;
        /// 具体是放到ToSimple里面去填写;
        /// </summary>
        //public int State { get; set; }

        /// <summary>
        /// 需要暂存=true,不暂存=false
        /// 注意这个和ModelWithIsHold中的IsHold是完全一样的
        /// </summary>
        public bool IsHold { get; set; } = false;

        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 附加动作的传入数据,比如任职打回去修改时,修改后的数据
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public StepDone ToSimple(int state)
        {
            return new StepDone()
            {
                StepId = this.StepId,
                State = state,
                Remark = this.Remark
            };
        }
    }

    /// <summary>
    /// 完成步骤时,提交的数据,只是这个没有附加数据,没有IsHold
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class StepDoneSimple
    {
        /// <summary>
        /// 完成哪个步骤
        /// </summary>
        public int StepId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public StepDone ToSimple(int state)
        {
            return new StepDone()
            {
                StepId = this.StepId,
                State = state,
                Remark = this.Remark
            };
        }
    }

    /// <summary>
    /// 携带是否缓存的提交数据
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ModelWithIsHold<T>
    {
        /// <summary>
        /// 数据
        /// </summary>
        public T Data { get; set; }
        /// <summary>
        /// 需要暂存=true,不暂存=false
        /// </summary>
        public bool IsHold { get; set; } = false;
    }

    /// <summary>
    /// 
    /// </summary>
    public class StepDone
    {
        /// <summary>
        /// 完成哪个步骤
        /// </summary>
        public int StepId { get; set; }
        /// <summary>
        /// 完整的状态值,步骤类型状态
        /// </summary>
        public int State { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }

    }

    //  /// <summary>
    //  /// TFNFlow的model
    //  /// </summary>
    //  [Serializable]
    //  public partial class VTFNFlow
    //  {

    //      #region 属性
    //      /// <summary>
    //      /// 
    //      /// </summary>
    //      public int Id { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int FlowTemplateId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string FlowTemplateName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string FlowTemplateComponentName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int SourceId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int State { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string StateName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int CreatorId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string CreatorWorkNumber { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string CreatorPhone { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string CreatorName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int? CreatorDpartmentId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string CreatorDepartmentName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public DateTime CreateDatetime { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string Remark { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int? LastStepId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int? LastStepTemplateId { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string LastStepTemplateName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string LastViewStepComponentName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string LastEditStepComponentName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public int? LastStepState { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public string LastStepStateName { get; set; }
    //      /// <summary>
    ///// 
    ///// </summary>
    //      public bool? IsCanOperate { get; set; }


    //      #endregion
    //  }

    //  /// <summary>
    //  /// 
    //  /// </summary>
    //  public class VTFNFlowFilter
    //  {
    //      public string WhereInSourceId { get; set; }
    //  }
}
