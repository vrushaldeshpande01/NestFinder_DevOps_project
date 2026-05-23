import { Property } from './types';

export const initialProperties: Property[] = [
  {
    id: 'urban-retreat',
    name: 'The Urban Retreat',
    location: 'Koramangala, Bangalore',
    locality: 'Koramangala',
    city: 'Bangalore',
    rating: 4.8,
    reviewsCount: 124,
    rent: 12500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1Lpzx9TmWE5l0-YqD7LLDuOwocPBJv65ug2f9Q_QdCr9qy8SZeO605zBt8-6UDtEiV7AiEFt1XFieExRmWgUr8BN2LPSnG7BbPKd5aptgSLuBpccPCi0ILTpCqiCvAIHKFgve8rQ7lLbKTjjuUTqCw0Ez1Df2aF7IkNtiY6mxaB4dfel_RoPh1tW4RQLk62GK2V83WlBcwawMSKX4YbhYYAm4XTOg2gkS59prm7mzXj1bYlrf7MXeCWCB7YPZNQvI2TAHLb3huGUZ',
    status: 'Available',
    category: 'student',
    roomTypes: ['double', 'triple'],
    amenities: ['Wi-Fi', 'Meals', 'AC', 'CCTV Security', 'Laundry'],
    description: 'A beautifully decorated modern bedroom in a high-end PG, featuring comfy mattresses, customized wardrobes, and a lively community. The room is bathed in soft, natural light coming through sheer curtains, creating a serene and trustworthy domestic atmosphere.',
    houseRules: [
      { title: 'No Smoking', desc: 'Smoking is strictly prohibited inside the premises.', icon: 'smoke_free' },
      { title: '10 PM Curfew', desc: 'Residents must return by 10 PM. Prior notice required for exceptions.', icon: 'schedule' },
      { title: 'No Outside Guests After 8 PM', desc: 'Visitors are allowed in the common lobby area only.', icon: 'person_add_disabled' }
    ],
    manager: {
      name: 'Rajesh Kumar',
      role: 'Property Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOzkw6tvDCqW5efR3kzh7TjZ18isxFJlwiF4bH5xxOEcNw98spJH42ZlPR_PSlH0--fn2nfbg75k4Z9RJE3C48wF4uHE0rj5z2So1EpP68x1qjZVnIIP2LZHFbvpD9iXLDWtG2I-Zgyz7x6yPaRBaYpj14AnhlHttXri-uiCPBjTRYNB9aTr8TOFSXLDaFd9s4LhjX0huVScTvBVMN9bfFp99wQ7QZnmPTXnI9XMGOMGL2lJJ6EghWj-abbRs4faGjeJFkt1Qxpy-'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1Lpzx9TmWE5l0-YqD7LLDuOwocPBJv65ug2f9Q_QdCr9qy8SZeO605zBt8-6UDtEiV7AiEFt1XFieExRmWgUr8BN2LPSnG7BbPKd5aptgSLuBpccPCi0ILTpCqiCvAIHKFgve8rQ7lLbKTjjuUTqCw0Ez1Df2aF7IkNtiY6mxaB4dfel_RoPh1tW4RQLk62GK2V83WlBcwawMSKX4YbhYYAm4XTOg2gkS59prm7mzXj1bYlrf7MXeCWCB7YPZNQvI2TAHLb3huGUZ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_vyKZ9VaBJDiioct0Gs9FLRtKowdiY_0nEhC7f1chwXOPYzazN1u6syLv6LkncKIOWo29LyOsXNclHx_pmVwz1HWbIYSVXvu-u_X15IXJOFvDq8QI6UH8aliHcTXUgWOIjgkkDMKb19qJBBLsxidxvgRMokw53um5pauJ7fpfAQ7TZE5GfLjn3f67kUhXyv_5LYZhx300aA0CwgkzQKHfLNDXrvGBQ5omrlsE3mKl0Ntf3zcGDxMkpqs8OdtFyKYERBA2ewHP1FVH',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQHfSBlWu5GKwOKV3Nq4BkFHAGg3LpKFq6ILyx5474RmfjRfW_m-CSU-yJCAVla96XiPvWnZHk-buuq83TTE9SCHWE6TnoYmhxPrTeBFDvZgwo9bQvTGlaOf2wryJlofO2R2nq4a7wxZyIBopScOUa_BCPvGQE_PF4BAC6FMVpVIVKn3gL_7JkZWZu-J9Ud1rRGqU5Gcq_T-FOpGeQbdcIaLvNp2VRDUy1WtBHlwQ5baHpMGdqjtJC9jc4GEryizt4gtrBBiM6rcX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuq0Vw5F-hMmq8QvWOAGRzMDnJGGLRy8VXLR9KopWycg2VLNAFAjd9HVcxS1Tm-OkvpLFWPHpv2yqkjOQZMBzqk1jgEMUfDj4s09OgiEBh8b_a1YsoUpzNPTa80GnEw7tavI5M7mCZFIdBLzZpWuca6d6Fkxt5WXO_Mb3b5d-zf1Ec156sSw7pZ08hQM07xdH0tkMPhgJlT1FhTweU46QL5GdIORpOPp_MNljx9f2X-KNJFm_gds4WyAp-7t_LxibbxErDrblcXWCd'
    ]
  },
  {
    id: 'skyline-premium',
    name: 'Skyline Premium',
    location: 'Gurgaon, Sector 44',
    locality: 'Sector 44',
    city: 'Gurgaon',
    rating: 4.9,
    reviewsCount: 98,
    rent: 18000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBifUYpfSIbPPfp0GUCx38xRIhNL87iNhlB7yD8V410rgwtBuNa58-VBlVVY-0ch9T2NbliggsBXO0dtB9QkD9EQVRhCEDA7LDMd2EcJdByrdw4saOa3mdlEOgApsz2BXeMKvklnRJr8W8IwTLPbfzgis1iR0ilbhZeGrHbnlv1Nm160uIlG0NWiLGFyJ90M88w2mYmdmlaoGClCbKsJ8FYTd_KePapp1-HHLMVo0VcVlqs-CtJp45J6bYwDiReo48zoWplWNDphZ8m',
    status: 'Limited',
    category: 'professional',
    roomTypes: ['single', 'double'],
    amenities: ['Wi-Fi', 'Gym', 'Meals', 'Power Backup', 'AC', 'Parking'],
    description: 'An elegant and modern studio room designed for a premium professional lifestyle, featuring a compact kitchenette, stylish workspace, high-speed Wi-Fi, and active safety systems.',
    houseRules: [
      { title: 'No Smoking', desc: 'Smoking is strictly prohibited inside the premises.', icon: 'smoke_free' },
      { title: '10 PM Curfew', desc: 'Residents must return by 10 PM. Prior notice required for exceptions.', icon: 'schedule' },
      { title: 'No Outside Guests After 8 PM', desc: 'Visitors are allowed in the common lobby area only.', icon: 'person_add_disabled' }
    ],
    manager: {
      name: 'Sarah D\'souza',
      role: 'Hosting Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBifUYpfSIbPPfp0GUCx38xRIhNL87iNhlB7yD8V410rgwtBuNa58-VBlVVY-0ch9T2NbliggsBXO0dtB9QkD9EQVRhCEDA7LDMd2EcJdByrdw4saOa3mdlEOgApsz2BXeMKvklnRJr8W8IwTLPbfzgis1iR0ilbhZeGrHbnlv1Nm160uIlG0NWiLGFyJ90M88w2mYmdmlaoGClCbKsJ8FYTd_KePapp1-HHLMVo0VcVlqs-CtJp45J6bYwDiReo48zoWplWNDphZ8m',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_vyKZ9VaBJDiioct0Gs9FLRtKowdiY_0nEhC7f1chwXOPYzazN1u6syLv6LkncKIOWo29LyOsXNclHx_pmVwz1HWbIYSVXvu-u_X15IXJOFvDq8QI6UH8aliHcTXUgWOIjgkkDMKb19qJBBLsxidxvgRMokw53um5pauJ7fpfAQ7TZE5GfLjn3f67kUhXyv_5LYZhx300aA0CwgkzQKHfLNDXrvGBQ5omrlsE3mKl0Ntf3zcGDxMkpqs8OdtFyKYERBA2ewHP1FVH',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQHfSBlWu5GKwOKV3Nq4BkFHAGg3LpKFq6ILyx5474RmfjRfW_m-CSU-yJCAVla96XiPvWnZHk-buuq83TTE9SCHWE6TnoYmhxPrTeBFDvZgwo9bQvTGlaOf2wryJlofO2R2nq4a7wxZyIBopScOUa_BCPvGQE_PF4BAC6FMVpVIVKn3gL_7JkZWZu-J9Ud1rRGqU5Gcq_T-FOpGeQbdcIaLvNp2VRDUy1WtBHlwQ5baHpMGdqjtJC9jc4GEryizt4gtrBBiM6rcX'
    ]
  },
  {
    id: 'narayan-pg-2',
    name: 'Narayan PG 2',
    location: 'Near Swaraj Food Court, Laxmi Chowk, Hinjewadi, Pune',
    locality: 'Hinjewadi',
    city: 'Pune',
    rating: 4.8,
    reviewsCount: 124,
    rent: 7000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj-04YAUT5AX-srN_Zd02mb2tCV78CL5Ugdg0BMcb-caYZCAg7ypSiTPILOEmpcDiTcBwsYhkfuiHPGc8-TA_T52_T6gClLtVfrrE5QYO-RkCqpcczPFcsr-Q1YiwIRbR87V8DAv8yNN6Ol-Lk8LAgb4Ey_t3_99Xhub2kC_jhMpCURCn8OjbUUmNyCusUUyk8UBkO5Zomp25kFqScmT0SdH4HCTt4SV_1ZPIkNuzX6xcU8msj8xOrK9OXK0i5CbevhJk5r4OneRaP',
    status: 'Available',
    category: 'luxury',
    roomTypes: ['double', 'triple'],
    amenities: ['Wi-Fi', 'AC', 'CCTV Security', 'Laundry', 'Meals', 'Power Backup', 'Daily Housekeeping', 'Parking'],
    description: 'Urban Nest PG offers a premium living experience tailored for the modern professional. Located in the heart of the business district, our residence combines the luxury of a hotel with the warmth of a home. We provide fully-furnished 2-sharing and 3-sharing rooms with premium fittings, ensuring your stay is comfortable and stress-free.',
    houseRules: [
      { title: 'No Smoking', desc: 'Smoking is strictly prohibited inside the premises.', icon: 'smoke_free' },
      { title: '10 PM Curfew', desc: 'Residents must return by 10 PM. Prior notice required for exceptions.', icon: 'schedule' },
      { title: 'No Outside Guests After 8 PM', desc: 'Visitors are allowed in the common lobby area only.', icon: 'person_add_disabled' }
    ],
    manager: {
      name: 'Rajesh Kumar',
      role: 'Property Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOzkw6tvDCqW5efR3kzh7TjZ18isxFJlwiF4bH5xxOEcNw98spJH42ZlPR_PSlH0--fn2nfbg75k4Z9RJE3C48wF4uHE0rj5z2So1EpP68x1qjZVnIIP2LZHFbvpD9iXLDWtG2I-Zgyz7x6yPaRBaYpj14AnhlHttXri-uiCPBjTRYNB9aTr8TOFSXLDaFd9s4LhjX0huVScTvBVMN9bfFp99wQ7QZnmPTXnI9XMGOMGL2lJJ6EghWj-abbRs4faGjeJFkt1Qxpy-'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDj-04YAUT5AX-srN_Zd02mb2tCV78CL5Ugdg0BMcb-caYZCAg7ypSiTPILOEmpcDiTcBwsYhkfuiHPGc8-TA_T52_T6gClLtVfrrE5QYO-RkCqpcczPFcsr-Q1YiwIRbR87V8DAv8yNN6Ol-Lk8LAgb4Ey_t3_99Xhub2kC_jhMpCURCn8OjbUUmNyCusUUyk8UBkO5Zomp25kFqScmT0SdH4HCTt4SV_1ZPIkNuzX6xcU8msj8xOrK9OXK0i5CbevhJk5r4OneRaP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_vyKZ9VaBJDiioct0Gs9FLRtKowdiY_0nEhC7f1chwXOPYzazN1u6syLv6LkncKIOWo29LyOsXNclHx_pmVwz1HWbIYSVXvu-u_X15IXJOFvDq8QI6UH8aliHcTXUgWOIjgkkDMKb19qJBBLsxidxvgRMokw53um5pauJ7fpfAQ7TZE5GfLjn3f67kUhXyv_5LYZhx300aA0CwgkzQKHfLNDXrvGBQ5omrlsE3mKl0Ntf3zcGDxMkpqs8OdtFyKYERBA2ewHP1FVH',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQHfSBlWu5GKwOKV3Nq4BkFHAGg3LpKFq6ILyx5474RmfjRfW_m-CSU-yJCAVla96XiPvWnZHk-buuq83TTE9SCHWE6TnoYmhxPrTeBFDvZgwo9bQvTGlaOf2wryJlofO2R2nq4a7wxZyIBopScOUa_BCPvGQE_PF4BAC6FMVpVIVKn3gL_7JkZWZu-J9Ud1rRGqU5Gcq_T-FOpGeQbdcIaLvNp2VRDUy1WtBHlwQ5baHpMGdqjtJC9jc4GEryizt4gtrBBiM6rcX',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuq0Vw5F-hMmq8QvWOAGRzMDnJGGLRy8VXLR9KopWycg2VLNAFAjd9HVcxS1Tm-OkvpLFWPHpv2yqkjOQZMBzqk1jgEMUfDj4s09OgiEBh8b_a1YsoUpzNPTa80GnEw7tavI5M7mCZFIdBLzZpWuca6d6Fkxt5WXO_Mb3b5d-zf1Ec156sSw7pZ08hQM07xdH0tkMPhgJlT1FhTweU46QL5GdIORpOPp_MNljx9f2X-KNJFm_gds4WyAp-7t_LxibbxErDrblcXWCd'
    ],
    sharingPrices: {
      '2 Sharing': 8500,
      '3 Sharing': 7000
    }
  },
  {
    id: 'harmony-house',
    name: 'Harmony House',
    location: 'Hinjewadi, Pune',
    locality: 'Hinjewadi',
    city: 'Pune',
    rating: 4.7,
    reviewsCount: 88,
    rent: 9000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC73S6Rf51NTfzfh0OPmgq5OeNApdeydRkXvzf2dbXZzzHwSvHcUFWlvvzjoRIu_ULfhTNndsQVFjE5Dn3a0U84cz0oo0XEY4R2iXNoPZjMMfQrKJkPZcm3Qk9oZGz36ovLVIJeGCfDyCdLTZ0A866FVX-k46IQlFZ0WVsqwaeW2o_wvYjnifJO8iPWCNxXkik1qh-E1yAG04n-FG1DVcev_P3GQx97TauaJ1ewXF7d_BExK86SK9OLmOJVJyr91377Hy1MV89FPrOH',
    status: 'Available',
    category: 'student',
    roomTypes: ['double', 'triple'],
    amenities: ['Wi-Fi', 'CCTV Security', 'Meals', 'Daily Housekeeping'],
    description: 'A bright and airy communal co-living area in a high-end complex, featuring comfortable modern furnishings, mini библиотека libraries, and plenty of refreshing indoor plants.',
    houseRules: [
      { title: 'No Smoking', desc: 'Smoking is prohibited inside rooms.', icon: 'smoke_free' },
      { title: '10 PM Curfew', desc: 'Curfew strictly set at 10 PM for safety.', icon: 'schedule' }
    ],
    manager: {
      name: 'Rajesh Kumar',
      role: 'Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOzkw6tvDCqW5efR3kzh7TjZ18isxFJlwiF4bH5xxOEcNw98spJH42ZlPR_PSlH0--fn2nfbg75k4Z9RJE3C48wF4uHE0rj5z2So1EpP68x1qjZVnIIP2LZHFbvpD9iXLDWtG2I-Zgyz7x6yPaRBaYpj14AnhlHttXri-uiCPBjTRYNB9aTr8TOFSXLDaFd9s4LhjX0huVScTvBVMN9bfFp99wQ7QZnmPTXnI9XMGOMGL2lJJ6EghWj-abbRs4faGjeJFkt1Qxpy-'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC73S6Rf51NTfzfh0OPmgq5OeNApdeydRkXvzf2dbXZzzHwSvHcUFWlvvzjoRIu_ULfhTNndsQVFjE5Dn3a0U84cz0oo0XEY4R2iXNoPZjMMfQrKJkPZcm3Qk9oZGz36ovLVIJeGCfDyCdLTZ0A866FVX-k46IQlFZ0WVsqwaeW2o_wvYjnifJO8iPWCNxXkik1qh-E1yAG04n-FG1DVcev_P3GQx97TauaJ1ewXF7d_BExK86SK9OLmOJVJyr91377Hy1MV89FPrOH'
    ]
  },
  {
    id: 'skyview-premium',
    name: 'Skyview Premium PG',
    location: 'Koramangala, Block 4, Bangalore',
    locality: 'Koramangala',
    city: 'Bangalore',
    rating: 4.8,
    reviewsCount: 145,
    rent: 14500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCpqwcFEptASWWlW_CRLEreXWlGWjlkc2NAIOnwqt1OSr_CIJGplpMpi4My08HPyDNTbP4jL9aV8CwZNj25PgYYdZPzt7kSRgLwD-pHvvCGPrNYNy4bor-uolYZeu2L2vNEcnIkrJSuBle65C18Zi3Rnf-_4gapUXLsLl4kpLnbxyyMXWWAtjNI7HXTc1cFV-6kOrh5Xcp7O2gYTMJSBvLo_QJRmv1LuE7HLw89vpAPtayJNwMhELUpP-JBRjtL2Nyu7W-j2kv88Ro',
    status: 'Available',
    category: 'luxury',
    roomTypes: ['single', 'double'],
    amenities: ['Wi-Fi', 'Meals', 'AC', 'CCTV Security'],
    description: 'A premium co-living studio with high-end designer styling, magnificent ventilation, custom dining setup, and superior AC systems.',
    houseRules: [
      { title: 'No Smoking', desc: 'Smoking is strictly prohibited inside the premises.', icon: 'smoke_free' }
    ],
    manager: {
      name: 'Sarah D\'souza',
      role: 'Hosting Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCpqwcFEptASWWlW_CRLEreXWlGWjlkc2NAIOnwqt1OSr_CIJGplpMpi4My08HPyDNTbP4jL9aV8CwZNj25PgYYdZPzt7kSRgLwD-pHvvCGPrNYNy4bor-uolYZeu2L2vNEcnIkrJSuBle65C18Zi3Rnf-_4gapUXLsLl4kpLnbxyyMXWWAtjNI7HXTc1cFV-6kOrh5Xcp7O2gYTMJSBvLo_QJRmv1LuE7HLw89vpAPtayJNwMhELUpP-JBRjtL2Nyu7W-j2kv88Ro'
    ]
  },
  {
    id: 'urban-oasis',
    name: 'Urban Oasis Coliving',
    location: 'HSR Layout, Sector 2, Bangalore',
    locality: 'HSR Layout',
    city: 'Bangalore',
    rating: 4.5,
    reviewsCount: 76,
    rent: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNGRNlCLs7efayz54jqo5iThQc3FEERKLH6C4fexOyRnP5Ft7oqY87owAywkzSfG8PkNQv-jOVtMAe0VaQSYH8_rpXzKTvGspWi-7LdlLKeCwF_dltj0OlY3q8cfwpUOK_xl2maWuSkfB-2MY5-hA_Nee3hkVtl-0Mf903GpWdrKtM3KKp4vLlT-xLXM49xSA7HOrzjQR3FACaANPHAKi3G-CCV3WmWcMSxRQoxpbNm3jmNwRAWcGVQnPqi25IANIr8HBSfTrnSbQe',
    status: 'Limited',
    category: 'professional',
    roomTypes: ['double', 'triple'],
    amenities: ['Wi-Fi', 'Laundry', 'CCTV Security'],
    description: 'A stylish and minimalist shared bedroom in HSR Layout. Features twin single beds with individual workstations, perfect for corporate employees seeking peaceful co-habitation.',
    houseRules: [
      { title: 'Cleanliness', desc: 'Maintain clean common areas.', icon: 'cleaning_services' }
    ],
    manager: {
      name: 'Sarah D\'souza',
      role: 'Hosting Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNGRNlCLs7efayz54jqo5iThQc3FEERKLH6C4fexOyRnP5Ft7oqY87owAywkzSfG8PkNQv-jOVtMAe0VaQSYH8_rpXzKTvGspWi-7LdlLKeCwF_dltj0OlY3q8cfwpUOK_xl2maWuSkfB-2MY5-hA_Nee3hkVtl-0Mf903GpWdrKtM3KKp4vLlT-xLXM49xSA7HOrzjQR3FACaANPHAKi3G-CCV3WmWcMSxRQoxpbNm3jmNwRAWcGVQnPqi25IANIr8HBSfTrnSbQe'
    ]
  },
  {
    id: 'hive-studios',
    name: 'The Hive Studios',
    location: 'Indiranagar, 12th Main, Bangalore',
    locality: 'Indiranagar',
    city: 'Bangalore',
    rating: 4.9,
    reviewsCount: 190,
    rent: 18000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJMZt8j_WrIUOPWNEGltcqf5uDNcsD83eDD8hnmxksTV9UHYtdve2mrzV65CTQ0Vj6MscRWl3K6K-jl4TdPENZFQFq40M6Yc77iuK4b65SYJL-8wnIv3S3akrKpDFjllMJMaqgOJKlcrSXhuxXCb2e7nya3UB9ivjoskXCVknC4yv0IGgT-0hyXzdgEUPAqGT5FuEHToTGgq5Emt-6eqF7QMQqMLtYGvTdgHrsv4r5scQuAX2S6r9zJvrJctvOE4rMi2cWHFjhcFtV',
    status: 'Available',
    category: 'luxury',
    roomTypes: ['single'],
    amenities: ['Wi-Fi', 'Gym', 'Meals', 'Power Backup', 'AC'],
    description: 'Sensational studio apartments containing sleek dining, rich ambient lounging, and a vibrant workspace, all illuminated by elegant pendant fixtures.',
    houseRules: [
      { title: 'Guest Limits', desc: 'No overnight guests without registering at reception.', icon: 'group' }
    ],
    manager: {
      name: 'Sarah D\'souza',
      role: 'Hosting Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJMZt8j_WrIUOPWNEGltcqf5uDNcsD83eDD8hnmxksTV9UHYtdve2mrzV65CTQ0Vj6MscRWl3K6K-jl4TdPENZFQFq40M6Yc77iuK4b65SYJL-8wnIv3S3akrKpDFjllMJMaqgOJKlcrSXhuxXCb2e7nya3UB9ivjoskXCVknC4yv0IGgT-0hyXzdgEUPAqGT5FuEHToTGgq5Emt-6eqF7QMQqMLtYGvTdgHrsv4r5scQuAX2S6r9zJvrJctvOE4rMi2cWHFjhcFtV'
    ]
  },
  {
    id: 'metropolitan-pg',
    name: 'Metropolitan PG',
    location: 'Whitefield, IT Park, Bangalore',
    locality: 'Whitefield',
    city: 'Bangalore',
    rating: 4.2,
    reviewsCount: 55,
    rent: 11000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBiWP_9L624jl3RBc9HOjR7Mm3T6V5-VZrtIN-7CuTJFcclZYt8wYFEkguWbyZBDW_ijnvi_1uSO-tv37qq9JAV-n8xPx_jh6R9zyo8jpID9vdQWCNAGkLdcrrtSsS-OeNoARb3KEGTgM_B3odeiRK_krdc4VwkoT02iqOAlgoCnpdLZAO3eogAcHIximuF2izd_WEgtYx2re-d1va6sjQQrxfa0Ti8eMIizQ97tJApmnVcX4Fb4agt5-jzPMFuSbhp9l9n9imeWRq',
    status: 'Available',
    category: 'professional',
    roomTypes: ['double', 'triple'],
    amenities: ['Wi-Fi', 'Transport', 'Meals', 'Power Backup'],
    description: 'A contemporary high-rise co-living facility near Whitefield tech hubs. Clean facade, excellent workspace desk, and organized daily transport support.',
    houseRules: [
      { title: 'Smoking', desc: 'No smoking anywhere inside.', icon: 'smoke_free' }
    ],
    manager: {
      name: 'Sarah D\'souza',
      role: 'Hosting Manager',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
    },
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBiWP_9L624jl3RBc9HOjR7Mm3T6V5-VZrtIN-7CuTJFcclZYt8wYFEkguWbyZBDW_ijnvi_1uSO-tv37qq9JAV-n8xPx_jh6R9zyo8jpID9vdQWCNAGkLdcrrtSsS-OeNoARb3KEGTgM_B3odeiRK_krdc4VwkoT02iqOAlgoCnpdLZAO3eogAcHIximuF2izd_WEgtYx2re-d1va6sjQQrxfa0Ti8eMIizQ97tJApmnVcX4Fb4agt5-jzPMFuSbhp9l9n9imeWRq'
    ]
  }
];
