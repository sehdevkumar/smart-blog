import { Image } from "@chakra-ui/react"

const AboutPage = ()=> {
     


    return (
         <div className="grid mobile:grid-cols-1 desktop:grid-cols-2 tablet:grid-cols-2 w-full h-full justify-center items-center">
                 
            <div className="w-full flex flex-1 justify-center">
                
                <div>
                    <Image src='' alt=''/>
                </div>
            
                 <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet purus quis metus imperdiet fermentum. Sed aliquet mi a mauris tincidunt feugiat. Nullam lobortis, nibh a ullamcorper dignissim, nunc urna fermentum metus, at viverra enim turpis vel quam. Fusce egestas ante vitae sapien bibendum dapibus. Aenean vehicula, mauris at facilisis fermentum, massa massa efficitur purus, ut fringilla sapien magna nec dui. Nam accumsan dapibus purus in dictum. Curabitur maximus nisi a dui ultrices, a ullamcorper libero suscipit. Suspendisse potenti. Curabitur vel ligula odio. Mauris nec velit at sapien venenatis commodo at ut magna. Etiam vehicula massa et dolor lobortis eleifend.
                 </div>

            </div>
            <div className="w-full flex flex-1 justify-start">Right</div>

         </div>
    )

}


export default AboutPage