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
    
    var body: some View {
        VStack {
            Spacer(minLength: 400)

            Button(action: {
                print("up")
                self.socketController.sendInput(x: 0)
            }) {
                Text("Up")
                    .font(.largeTitle)
            }
            
            HStack {
                Button(action: {
                    print("left")
                    self.socketController.sendInput(x: 3)
                }) {
                    Text("Left")
                        .font(.largeTitle)
                        .frame(height: nil)
                }
                
                Spacer()
                
                Button(action: {
                    print("right")
                    self.socketController.sendInput(x: 1)
                }) {
                    Text("Right")
                        .font(.largeTitle)
                }
            }
            .padding(.all, 45.0)
            
            Button(action: {
                print("down")
                self.socketController.sendInput(x: 2)
            }) {
                Text("Down")
                    .font(.largeTitle)
            }
            
            Spacer(minLength: 50)
            
            HStack {
                Button(action: {
                    print("back")
                    self.socketController.sendInput(x: 4)
                }) {
                    Text("Back")
                        .font(.largeTitle)
                }
                
                Spacer()

                Button(action: {
                    print("enter")
                    self.socketController.sendInput(x: 5)
                }) {
                    Text("Enter")
                        .font(.largeTitle)
                }
            }
            .padding([.leading, .bottom, .trailing], 36.0)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
