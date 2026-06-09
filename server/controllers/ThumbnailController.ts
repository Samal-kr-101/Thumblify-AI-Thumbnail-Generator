// import axios from "axios";
// import { Request, Response } from "express";
// import Thumbnail from "../models/Thumbnail.js";
// // import { GenerateContentConfig, HarmCategory } from "@google/genai";
// // import { HarmBlockThreshold } from "@google/genai";
// // import ai from "../configs/ai.js";
// import path from "path";
// import fs from "fs";
// // import {v2 as cloudinary} from "cloudinary"
// // import cloudinary from "../configs/cloudinary.js";

// const stylePrompts = {
//     'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
//     'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',
//     'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',
//     'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
//     'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
// }


// const colorSchemeDescriptions = {
//     vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
//     sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
//     forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
//     neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
//     purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
//     monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
//     ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
//     pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
// }



// export const generateThumbnail = async (req:Request, res: Response)=>{
//     try {
//         const {userId} = req.session;
//         const {title,prompt:user_prompt,style,aspect_ratio,color_scheme,text_overlay} = req.body;

//         const thumbnail = await Thumbnail.create({
//             userId,
//             title,
//             prompt_used:user_prompt,
//             style,
//             aspect_ratio,
//             color_scheme,
//             text_overlay,
//             isGenerating: true
//         })

//         // const model = 'gemini-3-pro-image-preview';

//         // const generationConfig: GenerateContentConfig={
//         //     maxOutputTokens:32768,
//         //     temperature:1,
//         //     topP:0.95,
//         //     responseModalities:['IMAGE'],
//         //     imageConfig:{
//         //         aspectRatio: aspect_ratio || '16:9',
//         //         imageSize:'1K'
//         //     },
//         //     safetySettings:[
//         //         { category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,threshold:HarmBlockThreshold.OFF},
//         //         { category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold:HarmBlockThreshold.OFF},
//         //         { category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold:HarmBlockThreshold.OFF},
//         //         { category:HarmCategory.HARM_CATEGORY_HARASSMENT, threshold:HarmBlockThreshold.OFF},
//         //     ]
//         // } 

//         let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;

//         if(color_scheme){
//             prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`            
//         }

//         if(user_prompt){
//             prompt += `Additional details: ${user_prompt}.`
//         }

//         prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`

//         // generate the image using the ai model

//         // const response: any = await ai.models.generateContent({
//         //     model,
//         //     contents:[prompt],
//         //     config: generationConfig,
//         // })

//         // console.log(JSON.stringify(response, null, 2));

//         // check if the response is valid


// const generateWithHF = async (prompt: string) => {
//     const url =
//   "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";

//     const response = await axios.post(
//         url,
//         { inputs: prompt },
//         {
//             headers: {
//                 Authorization: `Bearer ${process.env.HF_API_KEY}`,
//                 "Content-Type": "application/json",
//             },
//             responseType: "arraybuffer",
//             timeout: 60000,
//         }
//     );

//     return Buffer.from(response.data);
// };

//         const filename = `final-output-${Date.now()}.png`;
//         const filePath = path.join('images',filename);

//         const finalBuffer = await generateWithHF(prompt);

//         // create the images directory if it doesn't exist
//         fs.mkdirSync('images',{recursive:true })

//         // write the final image to the file
//         fs.writeFileSync(filePath,finalBuffer!);


//         // const uploadResult = await cloudinary.uploader.upload
//         // (filePath,{resource_type:'image'})

//         // thumbnail.image_url = uploadResult.url;
//         // thumbnail.isGenerating = false;
//         // await thumbnail.save()

//         // res.json({message:'Thumbnail Generated',thumbnail})


// const imageUrl = `http://localhost:3000/images/${filename}`;

// thumbnail.image_url = imageUrl;
// thumbnail.isGenerating = false;

// await thumbnail.save();

// return res.json({
//   message: "Thumbnail generated successfully",
//   imageUrl,
//   thumbnail
// });

// } catch (error: any) {
//     console.log(error);
//     return res.status(500).json({
//         message: error.message
//     });
// }
// };


// // controllers for thumbnail deletion
// export const deleteThumbnail = async (req:Request, res: Response)=>{
//     try {
//         const {id} = req.params;
//         const {userId} = req.session;

//         await Thumbnail.findByIdAndDelete({_id:id,userId})

//         res.json({message:'Thumbnail deleted successfully'});

//     } catch (error:any) {
//         console.log(error);
//         res.status(500).json({message:error.message})
//     }
// }


import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

// ---------------- STYLE MAPS ----------------

const stylePrompts = {
  "Bold & Graphic":
    "eye-catching youtube thumbnail, bold typography, vibrant colors, expressive face, dramatic lighting, high contrast, clickbait style",
  "Tech/Futuristic":
    "futuristic sleek design, neon cyberpunk glow, UI elements, high-tech aesthetic",
  "Minimalist":
    "clean minimal design, simple layout, lots of negative space, modern flat design",
  "Photorealistic":
    "ultra realistic DSLR photo, cinematic lighting, shallow depth of field",
  "Illustrated":
    "digital illustration, stylized characters, vibrant colors, bold outlines",
};

const colorSchemeDescriptions = {
  vibrant: "high saturation, bold contrast, vibrant colors",
  sunset: "warm orange pink purple cinematic lighting",
  forest: "natural green earthy calm tones",
  neon: "cyberpunk neon blue pink glow",
  purple: "purple magenta modern aesthetic",
  monochrome: "black and white dramatic contrast",
  ocean: "blue teal clean fresh tone",
  pastel: "soft pastel gentle aesthetic",
};

// ---------------- CONTROLLER ----------------

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const { title, prompt: user_prompt, style, aspect_ratio, color_scheme } =
      req.body;

    // 1. Save DB entry
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      isGenerating: true,
    });

    // 2. Build prompt (optimized for thumbnails)
    let prompt = `Create ${
      stylePrompts[style as keyof typeof stylePrompts] ||
      stylePrompts["Bold & Graphic"]
    } for YouTube thumbnail: "${title}".`;

    if (color_scheme) {
      prompt += ` Use ${
        colorSchemeDescriptions[
          color_scheme as keyof typeof colorSchemeDescriptions
        ] || ""
      }.`;
    }

    if (user_prompt) {
      prompt += ` Extra details: ${user_prompt}.`;
    }

    prompt += ` Aspect ratio ${aspect_ratio || "16:9"}. High CTR, viral, professional, cinematic composition.`;

    // 3. POLLINATIONS IMAGE GENERATION (NO API KEY, NO DNS ISSUES)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}`;

    if (!imageUrl) {
      throw new Error("Failed to generate image URL");
    }

    // 4. Save DB
    thumbnail.image_url = imageUrl;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    return res.json({
      message: "Thumbnail generated successfully (Pollinations)",
      imageUrl,
      thumbnail,
    });
  } catch (error: any) {
    console.error("ERROR:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

// ---------------- DELETE ----------------

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findOneAndDelete({ _id: id, userId });

    return res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};