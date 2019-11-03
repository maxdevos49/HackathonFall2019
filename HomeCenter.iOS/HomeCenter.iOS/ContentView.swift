//
//  ContentView.swift
//  HomeCenter.iOS
//
//  Created by Mason L Timmerman on 11/2/19.
//  Copyright © 2019 MadDevelopment. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    
    @EnvironmentObject var socketController: SocketController
    @State private var accessCode: String = ""
    
    var body: some View {
        Color.orange
        .edgesIgnoringSafeArea(.vertical)
        .overlay(
            
        VStack {
            Spacer();
            
            Image("homecenterlogo")
                .frame(width: 350.0, height: 150.0)
                .scaleEffect(/*@START_MENU_TOKEN@*/0.4/*@END_MENU_TOKEN@*/)

            Spacer();
            
            HStack {
                Spacer(minLength: 10)
                Text("Access Code: ")
                TextField("XXXX", text: $accessCode)
                Button(action: {
                    print("connect-button")
                    self.socketController.sendAccessCode(code: self.accessCode)
                }) {
                    Text("Connect!")
                        .foregroundColor(Color(red: 0, green: 0.0, blue: 0.0, opacity: 5))
                }
                
                Spacer(minLength: 10)
            }
            
            
            Spacer()

            Button(action: {
                print("up-button")
                self.socketController.sendInput(x: 0)
            }) {
                Text("Up")
                    .font(.largeTitle)
                    .foregroundColor(Color.black)
            }
            
            
            HStack {
                Button(action: {
                    print("left-button")
                    self.socketController.sendInput(x: 3)
                }) {
                    Text("Left")
                        .font(.largeTitle)
                        .foregroundColor(Color.black)
                        .frame(height: nil)
                }
                
                Spacer()
                
                Button(action: {
                    print("right-button")
                    self.socketController.sendInput(x: 1)
                }) {
                    Text("Right")
                        .font(.largeTitle)
                        .foregroundColor(Color.black)
                }
            }
            .padding(.all, 45.0)
            
            Button(action: {
                print("down-button")
                self.socketController.sendInput(x: 2)
            }) {
                Text("Down")
                    .font(.largeTitle)
                    .foregroundColor(Color.black)
            }
            
            Spacer(minLength: 50)
            
            HStack {
                Button(action: {
                    print("back-button")
                    self.socketController.sendInput(x: 4)
                }) {
                    Text("Back")
                        .font(.largeTitle)
                        .foregroundColor(Color.black)
                }
                
                Spacer()

                Button(action: {
                    print("enter-button")
                    self.socketController.sendInput(x: 5)
                }) {
                    Text("Enter")
                        .font(.largeTitle)
                        .foregroundColor(Color.black)
                }
            }
            .padding([.leading, .bottom, .trailing], 36.0)
        }
        
        
        
        )
        
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

//struct TouchGestureViewModifier: ViewModifier {
//    let touchBegan: () -> Void
//    let touchEnd: (Bool) -> Void
//
//    @State private var hasBegun = false
//    @State private var hasEnded = false
//
//    private func isTooFar(_ translation: CGSize) -> Bool {
//        let distance = sqrt(pow(translation.width, 2) + pow(translation.height, 2))
//        return distance >= 20.0
//    }
//
//    func body(content: Content) -> some View {
//        content.gesture(DragGesture(minimumDistance: 0)
//                .onChanged { event in
//                    guard !self.hasEnded else { return }
//
//                    if self.hasBegun == false {
//                        self.hasBegun = true
//                        self.touchBegan()
//                    } else if self.isTooFar(event.translation) {
//                        self.hasEnded = true
//                        self.touchEnd(false)
//                    }
//                }
//                .onEnded { event in
//                    if !self.hasEnded {
//                        let success = !self.isTooFar(event.translation)
//                        self.touchEnd(success)
//                    }
//                    self.hasBegun = false
//                    self.hasEnded = false
//                })
//    }
//}
//
//extension View {
//    func onTouchGesture(touchBegan: @escaping () -> Void = {},
//                        touchEnd: @escaping (Bool) -> Void = { _ in }) -> some View {
//        modifier(TouchGestureViewModifier(touchBegan: touchBegan, touchEnd: touchEnd))
//    }
//}
