﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace YukiSalonApi.Resources {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class Translation {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Translation() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("YukiSalonApi.Resources.Translation", typeof(Translation).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to This Email Adress is already taken.
        /// </summary>
        public static string EmailAlreadyExists {
            get {
                return ResourceManager.GetString("EmailAlreadyExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to ID does not match.
        /// </summary>
        public static string IdMismatch {
            get {
                return ResourceManager.GetString("IdMismatch", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to This Name is already taken.
        /// </summary>
        public static string NameAlreadyExists {
            get {
                return ResourceManager.GetString("NameAlreadyExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Remove is not allowed.
        /// </summary>
        public static string RemoveNotAllowed {
            get {
                return ResourceManager.GetString("RemoveNotAllowed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Remove is not allowed because the current Salon is the last one available.
        /// </summary>
        public static string RemoveNotAllowedLastSalon {
            get {
                return ResourceManager.GetString("RemoveNotAllowedLastSalon", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Remove is not allowed because the current User is the last one available.
        /// </summary>
        public static string RemoveNotAllowedLastUser {
            get {
                return ResourceManager.GetString("RemoveNotAllowedLastUser", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to You cannot remove yourself.
        /// </summary>
        public static string RemoveSelfNotAllowed {
            get {
                return ResourceManager.GetString("RemoveSelfNotAllowed", resourceCulture);
            }
        }
    }
}
