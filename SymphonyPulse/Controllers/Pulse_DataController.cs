//**********************************************************************
//
// Title:       Pulse_DataController.cs
//
// Type:        Class
//
// Description: Controller for calling back to remote server
//
// Author:      Richard C. Morris, Synergex Technology Evangelist
//				Synergex
//
// Copyright (c) 2016, Synergex International, Inc. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//*****************************************************************************
using Symphony.Harmony;
using Symphony.Harmony.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace SymphonyPulse.Controllers
{
    public class Pulse_DataController : ApiController
    {
        public async Task<List<Pulse_Data>> GetPulse_DataByDate(DateTime selectDate)
        {
            List<Pulse_Data> response = new List<Pulse_Data>();
            try
            {
                response = (await DataExecute.RunDataExecute(
                    new DBConnector("synremote:user/pass@SymphonyFramework!", HostServiceType.RelayServer, "dRjiyTaojffcmd8NlJyUmrbjY65TFW8XLd/wcP1Q6B0="),
                    "exec @SymphonyMetronome.PulseUtilities.GetPulseInfo",
                    new Pulse_Data(), selectDate))
                    .OfType<Pulse_Data>().ToList();
                
            }
            catch (Exception)
            {

                throw;
            }

            return response;
        }


        public async Task<List<Pulse_Data>> GetPulse_Data()
        {
            List<Pulse_Data> respone = new List<Pulse_Data>();
            try
            {
                respone = (await DataExecute.RunDataExecute(
                    new DBConnector("synremote:user/pass@localhost:8082!table.file.mapper", HostServiceType.ConsoleServerTcp),
                    "exec @SymphonyMetronome.PulseUtilities.GetPulseInfo",
                    new Pulse_Data(), DateTime.Today))
                    .OfType<Pulse_Data>().ToList();

            }
            catch (Exception ex)
            {

                throw;
            }

            return respone;
        }

    }
}
